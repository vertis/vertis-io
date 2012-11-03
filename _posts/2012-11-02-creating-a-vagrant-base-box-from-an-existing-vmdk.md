---
layout: default
published: false
---

# Creating a Vagrant "Base Box" from an existing VMDK

We have a build pipeline for our machine images at work. I don't want to digress too much, but the pipeline starts by using Koji to create a CentOS image that is then transformed for use in EC2 and VMWare.

The intent being to create a consistent experience across different "clouds". This has been working quite nicely (I may make this process the subject of another post).

For local work I wanted to bring down either the raw file or the vmdk as prepared for VMWare, and use it in virtual box. Since I couldn't find a single source of information about how to do this, I've compiled the steps and provided links back to where I sourced the information.

I've also compiled the tasks into a script that you can clone from GitHub

## Step 1 - Import/Create the VM
After lots of searching I came across some VirtualBox [tips and tricks](http://www.halfdog.net/Misc/TipsAndTricks/VirtualBox.html) including how to create a machine from scratch. It wasn't the only blog post I found with these commands, but it was a good complete script from which to hack.

{% highlight bash %}
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

{% highlight bash %}
cp latest.vmdk "${BOX_DIR}/${BOX_NAME}.vmdk"

VBoxManage storagectl "${BOX_NAME}" --name LsiLogic --add scsi --controller LsiLogic
VBoxManage storageattach "${BOX_NAME}" --storagectl LsiLogic --port 0 --device 0 --type hdd --medium "${BOX_DIR}/${BOX_NAME}.vmdk"
{% endhighlight %}

## Step 3 - Provide a NAT Port Mapping

To setup the items required for Vagrant, I have to SSH into the machine. The first part of that is creating an NAT Port Mapping. Another [post](http://timelordz.com/wiki/Virtualbox_Tips) provided the commands necessary to map the ssh port.

{% highlight bash %}
VBoxManage setextradata "${BOX_NAME}" "VBoxInternal/Devices/e1000/0/LUN#0/Config/SSH/Protocol" TCP
VBoxManage setextradata "${BOX_NAME}" "VBoxInternal/Devices/e1000/0/LUN#0/Config/SSH/GuestPort" 22
VBoxManage setextradata "${BOX_NAME}" "VBoxInternal/Devices/e1000/0/LUN#0/Config/SSH/HostPort" 22222
{% endhighlight %}

I initially thought to make the port mapping `222` because vagrant defaults to `2222`. Annoyingly this failed silently. Though the reason should be familiar to anyone with basic Linux administration knowledge -- using ports less than 1024 requires root access.

## Step 4 - Booting and waiting for SSH

With that done, the next step is to setup the user/access that vagrant expects. To do that we need to SSH into the box.

{% highlight bash %}
{% endhighlight %}
