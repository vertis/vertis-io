---
layout: post
title: "Remote X11 Applications on Windows"
---

<strong>Update: There are now much better ways of installing an X Server on windows (for details start with the <a href="http://xming.sourceforge.net">XMing</a> project</strong>)

The primary focus of this document is setting up Cygwin on a given client computer so that it can see graphics as sent from the server. Most of the configuration is done at a client level, however there are minor modifications that also need to be made at a server level.
<!--more-->
<strong>Installing Cygwin</strong>

For the uninitiated Cygwin is a free application, it can be installed on windows to simulate the Linux OS. Since our server runs on Linux this is a very good thing. You can start by getting the installer from <span style="text-decoration: underline;"><a href="http://www.cygwin.org/">http://www.cygwin.org</a></span>.

Rather than duplicating an existing document, follow the install procedures found at this site:

<span style="text-decoration: underline;"><a href="http://x.cygwin.com/docs/ug/setup-cygwin-x-installing.html">http://x.cygwin.com/docs/ug/setup-cygwin-x-installing.html</a></span>

<strong>Configuring Cygwin</strong>

The installation will take a while to download the packages depending on your connection speed and the server that you selected to download from. Once installed it is simply a matter of configuring Cygwin to take connections from remote hosts (it defaults to not allowing remote connections). This is file that you want to:

<em>C:\Cygwin\usr\X11R6\bin\startxwin.bat</em><strong> </strong>

Right down the bottom of the file you will find the following lines:

<em>run XWin -multiwindow -clipboard -silent-dup-error</em>

<em>REM Startup an xterm, using bash as the shell.</em>

<em>run xterm -e /usr/bin/bash -l</em>

Change it so that it looks like this:

<em>run XWin -multiwindow -clipboard -silent-dup-error</em>

<em>run xhost +</em>

<em>REM Startup an xterm, using bash as the shell.</em>

<em>REM run xterm -e /usr/bin/bash -l</em>

Adding the 'run xhost +' line tells it to allow any host to send graphics to your computer. Alternately you can specify an exact IP address after the plus to only allow that computer to send the graphics. Additionally you'll want to put a 'REM' in front of the 'run xterm' line otherwise it will pop up a window every time you start it. Save the file and put a copy into your startup directory. If you double click it now you should see a little 'X' icon appear in the system tray at the bottom right of the screen. Your computer is now ready to receive images.

<strong>Setting up the Server</strong>

It is possible that your server is already setup correctly, but we'll need to check to make sure that it's got the correct address when its trying to send the images out. You can check this from within Pinnacle, you should see in the top right hand corner an IP address, four numbers separated by dots(e.g. 192.168.0.25) if its there is a number there you can skip right on to testing the images from within pinnacle. If not I'll need to edit some file. Give me a call

That's it. Hopefully you have been rewarded with some images. If not give us a call and we'll work something out.
