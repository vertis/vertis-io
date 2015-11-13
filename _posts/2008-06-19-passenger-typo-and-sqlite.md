---
layout: post
title: "Passenger, Typo and Sqlite"
---

I upgraded my rails sites to use <a href="http://www.modrails.org">Passenger aka Mod Rails</a> this week. I'd like to say its been all roses, but the truth is that my Typo blog would swear under oath that its not the case. I was quite happy with the out of box Typo + Sqlite combination, and that worked fine under mongrel. Not so under passenger, the website will work perfectly, but I won't be able to get into the admin section. As you can see I managed to get it working, I switched the database to mysql and its been working fine ever since. I'll get around to working out WHY it doesn't work with sqlite at some point (and get around to extracting my lost blog posts).
<!--more-->
Other than that small hiccup I've been extremely impressed with Passenger. Its certainly a step forward as far a simple rails production hosting. I'm not saying that its time to throw mongrel out the window. But when it comes to trouble free hosting, mongrel is just not there. I want a solution where you can do a simple config and forget about the site. Managing multiple clusters for each of the various sites is something that makes it harder to whip up simple sites.

Passenger allows the user to to configure an apache virtual host with a couple of rails specific parameters (more if you want to take advantage of somecool feature, or do abnormal things), and restart apache and you're all up and good. Restarting your rails app can be accomplished by running 'touch tmp/restart.txt' in your rails root. You've then got a very simple solution that will allow you to host multiple sites without doing clustering.
