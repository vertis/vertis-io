---
published: true
layout: post
title: "My run in with Unauthorised Litecoin mining on AWS"
author: vertis
---

Normally I'm a big advocate of open sourcing projects both current (and old) on GitHub. Today though, I wish that I wasn't.

On sunday night I received an email from Amazon saying that they'd detected my Amazon key on one of my repositories. This was a little bit of a surprise, because I'm usually so dilligent about not saving credentials into repositories.

After a brief search I found the key buried in an old project that I'd just decided didn't need to be private.

That wasn't the end of the matter, I was in for a rude shock when I logged into my Amazon account to check for unauthorised usage. $3000+ in pending charges. Woah!

![Billing Dashboard](/assets/images/aws-billing-dashboard.png)

It didn't take long to find the source of the billing. Twenty cc2.8xlarge instances humming along in the us-east region for the last two days.

By this stage I'd already revoked the key (as suggested in the email). So I quickly shut the instances down, while I would have liked to preserve them for forensics, I just couldn't afford to leave them running while waiting for Amazon support (I do not pay for support, since this is just my private account that I dabble with).

After taking stock for a few moments, I detached one of the volumes and attached it to another instance. Having a poke around confirmed what I had already guessed. The unauthorised user had been mining litecoin with the mining pool (pool-x.eu)[http://pool-x.eu].

I've emailed (pool-x.eu)[http://pool-x.eu] asking them to suspend the account, but I've yet to receive a reply.

What have I learned from this experience?

## Enable billing alerts
Given I spend about $60-80 a month with Amazon usually, I could have been warned MUCH earlier. Needless to say, now that the horse has bolted I've enabled the horse bolting detector.

## Check GitHub
It's not really that hard to do a regular search of GitHub for keys and passwords in your repositories.

## Audit code before open sourcing
Always a good rule, but be especially careful flicking the switch on repositories that you've had as private for a long time.