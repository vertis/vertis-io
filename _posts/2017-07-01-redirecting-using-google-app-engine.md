---
published: false
layout: post
title: "Redirecting HTTP traffic via Google App Engine"
author: vertis
---

A few years ago I wrote a tool called [Nomad](https://github.com/vertis/nomad) to help with redirecting old URLs that you may have used for blogs or whatever To a new home. My reasoning at the time (and I still believe this now) is that you should be a good custodian of the content you put on the web, even if you no longer think is important.

[Nomad](https://github.com/vertis/nomad) allowed you to very easily create a set of paths and then have then redirect anything then hit those paths to the target URL and path. My thinking was that it would make it really easy for somebody to just set up the redirects...unfortunately nobody was interested. I eventually just shut it down and decided to come up with a simpler solution that just served me.

As an aside, [Nomad](https://github.com/vertis/nomad) is an interesting lesson in product market fit. Anyone technical enough to need to redirect traffic didn't really need somebody to handhold them through it, they could always setup their own server and do it. Using my little side project relied on trusting me not to screw them over either by disappearing and letting them down, or worse maliciously using the URL they’d entrusted me with.

Given that I still needed to redirect some of my own URLs I was in left with the problem of working out how to do that effectively. At the time I ended up settling on Apache rewrites to do the task. It was the most commonly used method. This worked well for a while but it meant that I was paying $5 a month to [digitalocean](https://digitalocean.com) for the right to redirect my old URL to my *new* blog.

Fast forward to now, and I've been working through all tools and websites that I run working out how to run them more cheaply/efficiently. It seems stupid but $5 over a whole year as up $60 when you count the fact that's in US dollars and therefore ~1.3 Australian dollars, all of a sudden it’s about to AUD$100 a year give or take. Given that the blog has been redirecting from ~5 years that’s AUD$500 for my high ideals of not making linked content inaccessible. Not exactly money well spent.

In any case and a new plan was called for. The cheapest way of hosting something now is a static site (either, github pages or S3 for exampled). Unfortunately, the need to do 301 redirects it makes very hard to do it as just static website. My second “go to” would have been Heroku. However it has increasingly become more and more problematic to run anything free reliably on Heroku. I've been burnt a couple of times with leaving free sites up and then finding out that they just stopped running because it had eaten up the free dyno hours (now an account wide pool).

Enter Google App Engine. To an extent Goole App Engine is free. It has fairly generous free limits for the instance hours before you begin being billed. While this may not be sufficient if you’ve got a large amount of traffic, it certainly suffices for my redirection needed.
The code to run this app is very simple. Rather than step through it all here, I’ve just provided a link to the github repo.

First Steps first. You'll need to have Google Cloud SDK tools on your machine. I'm not going to go through  installing them. There are plenty of good guides out there including Google's own tutorials to make it very simple.

Assuming that you have these are installed already if not you should definitely go and follow the tutorial about. You simply need to run gcloud app deploy and alternate optionally include the project. If you haven't created a project for this already you can do so with gcloud blah blah blah. You paragraph

Once you've done this you should then be able to browser URL that the command output typically it is https://<yourprojectid>.appspot.com and see it redirects to the url that you're expecting it to go to.

The only remaining step is then to activate a custom URL on Google. Google requires that you verify ownership of this URL in order to do this (I’m not entirely sure why, because you can’t make the URL point at Google App Engine without the same access required to verify the URL). Again, Google's documentation does fairly decent job of walking through the process of adding custom domain names so I won't belabour that either.

And there you have it. Now you can redirect your old log domains to whatever new hosting github pages or some other static hosting (my current blog home), without paying to host an Apache server somewhere.

Hopefully I won't regret my decisions.
