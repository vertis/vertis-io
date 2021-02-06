---
published: true
layout: post
title: "rEFInd: SIP and Secure Boot"
author: vertis
minutes_read: 5
feature_image:
  url: /assets/img/unable-to-verify-startup-disk.jpg
  caption: "Boot Recovery Assistant: Unable to verify startup disk after rEFInd install"
meta_description: "rEFInd: SIP and Secure Boot"
---
For a variety of reasons I dual-boot Mac OS and Windows 10. One minor annoyance is having to hold option to boot the other environment.

There are several solutions to this. One can set the default from commands before restarting. In hindsight, I should have done this. Instead I went to a tool that I have used before, called [rEFInd](https://www.rodsbooks.com/refind/).

All I wanted was to a list to pick from every boot. rEFInd, which I've used when booting Linux on a Mac allows this. On my 2018 Macbook Pro getting it working was less than straight forward.

There are many protections in place to protect the boot files. They can be a target of malware/rootkits. This first, System Integrity Protection (SIP) is well covered in the [documentation](https://www.rodsbooks.com/refind/installing.html).

We can either run the install from Recovery or disable SIP using `csrutil disable`. I decided to do the install from Recovery. After installing I rebooted, expecting the friendly rEFInd prompt. No such luck, the Recovery environment came back with "Unable to verify startup disk".

This happens because Secure Boot verifies the signatures before booting. rEFInd is not signed and so fails verification. We can confirm this by turning off Secure Boot in the "Startup Disk Security" menu option of Recovery. This isn't a long term solution though. Those protections are there for a reason.

The rEFInd documentation has information about [Secure Boot](https://www.rodsbooks.com/refind/secureboot.html), but not front and centre. If you're on a Mac with Secure Boot (most new macs), you'll need to use a [signed shim](http://www.codon.org.uk/~mjg59/shim-signed/). Once added rEFInd will show when Secure Boot is active.

Make sure you also re-enable SIP if you disabled it during the installation process.