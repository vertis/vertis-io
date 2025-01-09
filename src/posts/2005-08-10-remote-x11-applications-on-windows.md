---
layout: post
title: 'Remote X11 Applications on Windows'
author: vertis
published: true
date: '2005-08-10'
---

**Update: There are now much better ways of installing an X Server on windows (for details start with the [XMing](http://xming.sourceforge.net) project)**

The primary focus of this document is setting up Cygwin on a given client computer so that it can see graphics as sent from the server. Most of the configuration is done at a client level, however there are minor modifications that also need to be made at a server level.

<!--more-->

## Installing Cygwin

For the uninitiated Cygwin is a free application, it can be installed on windows to simulate the Linux OS. Since our server runs on Linux this is a very good thing. You can start by getting the installer from [http://www.cygwin.org/](http://www.cygwin.org/).

Rather than duplicating an existing document, follow the install procedures found at this site:

[http://x.cygwin.com/docs/ug/setup-cygwin-x-installing.html](http://x.cygwin.com/docs/ug/setup-cygwin-x-installing.html)

## Configuring Cygwin

The installation will take a while to download the packages depending on your connection speed and the server that you selected to download from. Once installed it is simply a matter of configuring Cygwin to take connections from remote hosts (it defaults to not allowing remote connections). This is file that you want to:

_C:\Cygwin\usr\X11R6\bin\startxwin.bat_

Right down the bottom of the file you will find the following lines:

```
run XWin -multiwindow -clipboard -silent-dup-error

REM Startup an xterm, using bash as the shell.

run xterm -e /usr/bin/bash -l
```

Change it so that it looks like this:

```
run XWin -multiwindow -clipboard -silent-dup-error

run xhost +

REM Startup an xterm, using bash as the shell.

REM run xterm -e /usr/bin/bash -l
```

Adding the 'run xhost +' line tells it to allow any host to send graphics to your computer. Alternately you can specify an exact IP address after the plus to only allow that computer to send the graphics. Additionally you'll want to put a 'REM' in front of the 'run xterm' line otherwise it will pop up a window every time you start it. Save the file and put a copy into your startup directory. If you double click it now you should see a little 'X' icon appear in the system tray at the bottom right of the screen. Your computer is now ready to receive images.

## Setting up the Server

It is possible that your server is already setup correctly, but we'll need to check to make sure that it's got the correct address when its trying to send the images out. You can check this from within Pinnacle, you should see in the top right hand corner an IP address, four numbers separated by dots (e.g. 192.168.0.25) if its there is a number there you can skip right on to testing the images from within pinnacle. If not I'll need to edit some file. Give me a call

That's it. Hopefully you have been rewarded with some images. If not give us a call and we'll work something out.
