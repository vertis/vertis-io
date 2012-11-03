---
layout: post
published: true
---

# Creating a Vagrant "Base Box" from an existing VMDK

We have a build pipeline for our machine images at work. I don't want to digress too much, but the pipeline starts by using Koji to create a CentOS image that is then transformed for use in EC2 and VMWare.

The intent being to create a consistent experience across different "clouds". This has been working quite nicely (I may make this process the subject of another post).

For local work I wanted to bring down either the raw file or the vmdk as prepared for VMWare, and use it in virtual box. Since I couldn't find a single source of information about how to do this, I've compiled the steps and provided links back to where I sourced the information.

I've also compiled the tasks into a script that you can clone from GitHub

## Caveats and disclaimers
1. I don't pretend to be an expert at VirtualBox (I may be doing things the hard way)
2. The code is very "brute force", it doesn't check very much between each step

## Step 1 - Import/Create the VM
After lots of searching I came across some VirtualBox [tips and tricks](http://www.halfdog.net/Misc/TipsAndTricks/VirtualBox.html) including how to create a machine from scratch. It wasn't the only blog post I found with these commands, but it was a good complete script from which to hack.

{% highlight console %}
BOX_NAME=platform-build
BASE_DIR="`pwd`/machines"
BOX_DIR="${BASE_DIR}/${BOX_NAME}"

mkdir -p ${BASE_DIR}

VBoxManage createvm --name "${BOX_NAME}" --ostype RedHat_64 --basefolder ${BASE_DIR}

VBoxManage registervm "${BOX_DIR}/${BOX_NAME}.vbox"
{% endhighlight %}

The VBoxManage command will create a directory under the base folder and store a `.vbox` file of the same name inside.

The `--ostype` will vary depending on the distro you're trying to use. You can get a complete list with `VBoxManage list ostypes`.

## Step 2 - Create a storage controller & copy/attach the VMDK

From there on in, I departed (slightly) from the script I'd found, and copied my existing `.vmdk` into the same directory as the `.vbox`.

{% highlight console %}
cp latest.vmdk "${BOX_DIR}/${BOX_NAME}.vmdk"

VBoxManage storagectl "${BOX_NAME}" --name LsiLogic --add scsi --controller LsiLogic
VBoxManage storageattach "${BOX_NAME}" --storagectl LsiLogic --port 0 --device 0 --type hdd --medium "${BOX_DIR}/${BOX_NAME}.vmdk"
{% endhighlight %}

I have an additional problem. The VMDK only has a 1GB of space. After a bit of searching I found a stackoverflow question that helped me resize the disk. The above code changes to:
{% highlight console %}
mkdir -p tmp
rm -rf tmp/clone.vdi
VBoxManage clonehd latest.vmdk tmp/clone.vdi --format vdi
VBoxManage modifyhd tmp/clone.vdi --resize 20480
VBoxManage clonehd tmp/clone.vdi "${BOX_DIR}/${BOX_NAME}.vmdk" --format vmdk
VBoxManage -q closemedium disk tmp/clone.vdi
rm -f tmp/clone.vdi

VBoxManage storagectl "${BOX_NAME}" --name LsiLogic --add scsi --controller LsiLogic
VBoxManage storageattach "${BOX_NAME}" --storagectl LsiLogic --port 0 --device 0 --type hdd --medium "${BOX_DIR}/${BOX_NAME}.vmdk"
{% endhighlight %}

## Step 3 - Provide a NAT Port Mapping

To setup the items required for Vagrant, I have to SSH into the machine. The first part of that is creating an NAT Port Mapping. Another [post](http://timelordz.com/wiki/Virtualbox_Tips) provided the commands necessary to map the ssh port.

{% highlight console %}
VBoxManage setextradata "${BOX_NAME}" "VBoxInternal/Devices/e1000/0/LUN#0/Config/SSH/Protocol" TCP
VBoxManage setextradata "${BOX_NAME}" "VBoxInternal/Devices/e1000/0/LUN#0/Config/SSH/GuestPort" 22
VBoxManage setextradata "${BOX_NAME}" "VBoxInternal/Devices/e1000/0/LUN#0/Config/SSH/HostPort" 22222
{% endhighlight %}

I initially thought to make the port mapping `222` because vagrant defaults to `2222`. Annoyingly this failed silently. Though the reason should be familiar to anyone with basic Linux administration knowledge -- using ports less than 1024 requires root access.

## Step 3a - Stuff that didn't belong anywhere else

{% highlight console %}
VBoxManage modifyvm "${BOX_NAME}" --usb on --usbehci on
VBoxManage modifyvm "${BOX_NAME}" --memory 512
{% endhighlight %}


## Step 4 - Booting and waiting for SSH

With that done, the next step is to setup the user/access that vagrant expects. To do that we need to SSH into the box.

{% highlight console %}
VBoxManage startvm "${BOX_NAME}" #--type headless

echo "Sleeping to give machine time to boot"
sleep 60
{% endhighlight %}

I experimented with a few ways of watching for ssh, but in the end none of them worked very well. So instead, just sleep for a while.


## Step 5 - Setting up the vagrant user
Creating the user is fairly trivial, editing the /etc/sudoers file not so much. I downloaded a copy and then made the modifications.

{% highlight console %}
echo "Uploading ssh key & creating vagrant user"
cat ~/.ssh/vagrant.pub | ssh -p 22222 root@localhost "umask 077; test -d .ssh || mkdir .ssh ; cat >> .ssh/authorized_keys"  
ssh -p 22222 root@localhost <<EOT
  useradd vagrant 
  echo vagrant | passwd vagrant --stdin
  umask 077 
  test -d /home/vagrant/.ssh || mkdir -p /home/vagrant/.ssh
  cp ~/.ssh/authorized_keys /home/vagrant/.ssh
  chown -R vagrant:vagrant /home/vagrant/.ssh
EOT
scp -P 22222 templates/sudoers root@localhost:/etc/sudoers
{% endhighlight %}

## Step 6 - Shutting down and packaging
The final step, is to shutdown and package the box for distribution

{% highlight console %}
echo -n "Waiting for machine to shutdown"
VBoxManage controlvm ${BOX_NAME} acpipowerbutton
while [ `VBoxManage showvminfo --machinereadable platform-build | grep VMState=` != 'VMState="poweroff"' ]; do
  echo -n .
  sleep 1
done
echo "Done"
vagrant package --base ${BOX_NAME} --output ${BOX_NAME}.box
{% endhighlight %}