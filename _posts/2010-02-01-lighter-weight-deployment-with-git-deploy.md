---
layout: post
title: "Lighter weight deployment with git-deploy"
---

Up until now I've been using a fairly standard capistrano deploy.rb. The problem is that as we speak I'm trying to deploy a patch from my Windows work machine and it's not working. The ethics of fixing one of my project from home aside, this is a problem. When I try and deploy the following error  comes up
<!--more-->
<blockquote>can't convert Net::SSH::Authentication::Pageant::Socket into IO (TypeError)</blockquote>
The change I was trying to deploy stops in its tracks. After quite a bit of searching I found a <a href="http://thread.gmane.org/gmane.comp.lang.ruby.capistrano.general/5804/focus=5807">thread</a> about the error that dates back to Capistrano 2.5.3... from 2008. What a shining example of open source.

To be fair the error isn't necessarily in Capistrano, it may in fact be in Net::SSH. The sad thing is that we're over a year later, and nothing has been done to fix the problem. Is the number of people that use Ruby from Windows machines so low that no-one has managed to fix it in a year?

I'm not expecting Jamis to fix it. I get that he has too much to do, and doesn't have time to give out a bunch of freebie support, but I'm now faced with the choice of either trying to fix the problem, a task I don't currently have time for, or ditching capistrano.

I've considered switching to heroku in the past and just never made the leap. For a start the app in question has to many moving parts for heroku. One thing I did like though was the notion that to deploy all I had to do was 'git push target master'  and the app would be updated and deployed.

After toying around with rolling my own solution, I stumbled upon <a href="http://www.github.com/mislav/git-deploy">mislav's gem</a>. It lacks some of the features that I'm looking for, but its a good deal closer to the level that I need. It lacks the bloat of capistrano, which is important, because the biggest barrier to me getting in and fixing capistrano would be the size of the library and knowing where to start.

I very quickly migrated my existing application to use git-deploy. It's not perfect for every problem, particularly if you're doing multi stage deployments, etc, but at least I'll be able to do a deployment everywhere I can get access to git now.
