---
layout: post
published: true
title: Creating a Vagrant base box from an existing Vmdk
---

Before moving on the the meat of this post some background is in order.

Doing continuous delivery sounds straight forward. Maybe it is, if you have a small organisation and a green fields application. If you have many applications that tie together, you're in for a different experience.

The work I've been doing recently involves creating a standard platform for our applications. Part of the process of creating this platform involves spinning a a machine image for use within our production, staging and development environments.There is ample material in our current build pipeline for a dozen blog posts. Maybe I'll get around to writing about it at some point.

Our "machine image pipeline" begins by using [Koji](https://fedoraproject.org/wiki/Koji) to create a CentOS image. The image is then transformed for use in EC2 and VMWare.

In addition to using the machines within Amazon EC2, many devs would like to be able to use the machine image locally. Since [Vagrant](http://vagrantup.com) is a popular option for running machines locally, it's an ideal choice to add to the pipeline.

There doesn't seem to be a lot of information about the process of converting an existing machine image to work with Vagrant (in an automated fashion). I've compiled the steps I had to take and provided links back to where I sourced the information.

## Caveats and disclaimers
1. I don't pretend to be an expert at VirtualBox (I may be doing things the hard way)
2. The code is very "brute force", it doesn't check very much between each step

## Step 1 - Import/Create the VM
After lots of searching I came across some VirtualBox [tips and tricks](http://www.halfdog.net/Misc/TipsAndTricks/VirtualBox.html) including how to create a machine from scratch. It wasn't the only blog post I found with these commands, but it was a good complete script from which to hack.

<script src="https://gist.github.com/4005946.js?file=createbox-part1.sh"></script>

The VBoxManage command will create a directory under the base folder and store a `.vbox` file of the same name inside.

The `--ostype` will vary depending on the distro you're trying to use. You can get a complete list with `VBoxManage list ostypes`.

## Step 2 - Create a storage controller & copy/attach the VMDK

From there on in, I departed (slightly) from the script I'd found, and copied my existing `.vmdk` into the same directory as the `.vbox`.

<script src="https://gist.github.com/4005946.js?file=createbox-part2.sh"></script>

I have an additional problem. The VMDK only has a 1GB of space. After a bit of searching I found a stackoverflow question that helped me resize the disk. The above code changes to:
<script src="https://gist.github.com/4005946.js?file=createbox-part2-alt.sh"></script>

## Step 3 - Provide a NAT Port Mapping

To setup the items required for Vagrant, I have to SSH into the machine. The first part of that is creating an NAT Port Mapping. Another [post](http://timelordz.com/wiki/Virtualbox_Tips) provided the commands necessary to map the ssh port.

<script src="https://gist.github.com/4005946.js?file=createbox-part3.sh"></script>

I initially thought to make the port mapping `222` because vagrant defaults to `2222`. Annoyingly this failed silently. Though the reason should be familiar to anyone with basic Linux administration knowledge -- using ports less than 1024 requires root access.

## Step 3a - Stuff that didn't belong anywhere else

<script src="https://gist.github.com/4005946.js?file=createbox-part3a.sh"></script>


## Step 4 - Booting and waiting for SSH

With that done, the next step is to setup the user/access that vagrant expects. To do that we need to SSH into the box.

<script src="https://gist.github.com/4005946.js?file=createbox-part4.sh"></script>

I experimented with a few ways of watching for ssh, but in the end none of them worked very well. So instead, just sleep for a while.


## Step 5 - Setting up the vagrant user
Creating the user is fairly trivial, editing the /etc/sudoers file not so much. I downloaded a copy and then made the modifications.

<script src="https://gist.github.com/4005946.js?file=createbox-part5.sh"></script>

## Step 6 - Shutting down and packaging
The final step, is to shutdown and package the box for distribution

<script src="https://gist.github.com/4005946.js?file=createbox-part6.sh"></script>

## Finally the complete script
For ease of use, here is the complete script.

<script src="https://gist.github.com/4005946.js?file=createbox-complete.sh"></script>