---
layout: post
title: "Corkscrew to the Net"
---

I'm thrilled to announce I am no longer a prisoner of an oppressive firewall. I'm currently working at a clients site for the next *year* give or take, which has been great, but one of the things that has really irked is the fact that their firewall is downright oppressive. Corporate policies prevent anything other than 80/443 out onto the net and stop webmail from working (to protect from viruses). This is a problem for me because I keep 2-3 dedictated linux servers for various reasons, obviously I can get to the hosted webapps just fine, but sshing in the change something on them is not possible due to the above mentioned firewall.
<!--more-->
Thats where corkscrew comes in. its a tool that allows you to change the clientside settings for OpenSSH to tunnel over the HTTP Proxy. Of course you still have to make sure that the SSH server is listening on either 80 or 443, however this is easy to accomplish if either one or both of those ports are spare or alternately you can assign and extra ip address and avoid apache/etc listening on */0.0.0.0

I'll leave it to the other <a href="http://www.mtu.net/%7Eengstrom/ssh-proxy.php">corkscrew guides</a> as to the particular setup. And yes its probably possible for them to block this, which is why I won't scream to loudly. Just remember if you're one of those people trying to prevent people from using this that I'm not trying to do anything nefarious, i'm simply a geek who needs/loves port 22.
