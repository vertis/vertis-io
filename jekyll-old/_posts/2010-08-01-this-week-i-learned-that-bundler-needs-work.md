---
layout: post
title: "This week I learned - that bundler needs work"
---

One of the challenges over the last few weeks has been switching development environments to phase in the new Macbook Pros (sweet!). One of the problems has been the fact that both our rails projects use bundler.
<!--more-->
Before I go on I should point out that [@wycats](http://www.twitter.com/wycats) was very helpful in sorting this problem out.

It 's not that bundler is bad directly, but when you're using bundler on Mac but deploying to Ubuntu there are a few eccentricities - particularly with native gems.

If you've run  'bundle package' at any point in the past then bundler will have started keeping a copy of all the gems in vendor/cache. When you're using a gem that needs certain compile flags on Ubuntu but not MacOS X that poses a problem.

The way to do this with bundler pre 1.0 is/was to install the gem to the system using the requisite build flags, and then when bundler installs the gem it takes the already installed gem. If the gem is already in vendor/cache however that doesn't work.

Suffice it to say that after some confusion and removal of the gem from BOTH caches (vendor/cache and ~/.bundle) and then running bundle install will fixed the problem.

Incidentally bundler 1.0.0rc2 takes care of this problem by introducing the ability to add build flags to the .bundle/config file.
