---
published: true
layout: post
title: My run in with Unauthorised Litecoin mining on AWS
author: vertis
feature_image:
  url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/d7655060-12e0-4176-b230-c91f83d2ea00/w=800
  caption: My AWS Billing Dashboard
  preview_url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/d7655060-12e0-4176-b230-c91f83d2ea00/w=450
---

__Update: You can read an update to this story [here](https://vertis.io/2013/12/17/an-update-on-my-aws-bill.html)__

Normally I'm a big advocate of open sourcing projects both current (and old) on GitHub. Today though, I wish that I wasn't.

On Sunday night I received an email from Amazon saying that they'd detected my Amazon key on one of my repositories. This was a little bit of a surprise, because I'm usually so diligent about not saving credentials into repositories.

<!--more-->

After a brief search I found the key buried in an old project that I'd just decided didn't need to be private.

That wasn't the end of the matter, I was in for a rude shock when I logged into my Amazon account to check for unauthorised usage. $3000+ in pending charges. Woah!

![Billing Dashboard](https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/d7655060-12e0-4176-b230-c91f83d2ea00/w=800)

It didn't take long to find the source of the billing. Twenty cc2.8xlarge instances humming along in the us-east region for the last two days.

By this stage I'd already revoked the key (as suggested in the email). So I quickly shut the instances down, while I would have liked to preserve them for forensics, I just couldn't afford to leave them running while waiting for Amazon support (I do not pay for support, since this is just my private account that I dabble with).

After taking stock for a few moments, I detached one of the volumes and attached it to another instance. Having a poke around confirmed what I had already guessed. The unauthorised user had been mining litecoin with the mining pool [pool-x.eu](http://pool-x.eu).

I've emailed [pool-x.eu](http://pool-x.eu) asking them to suspend the account, but I've yet to receive a reply.

What have I learned from this experience?

## Enable billing alerts
Given I spend about $60-80 a month with Amazon usually, I could have been warned MUCH earlier. Now that the horse has bolted I've enabled the horse bolting detector.

## Check GitHub
It's not really that hard to do a regular search of GitHub for keys and passwords in your repositories. Check your friends repositories as well...many eyes.

## Audit code before open sourcing
Always a good rule, but be especially careful flicking the switch on repositories that you've had as private for a long time.

Update: [@joneaves](http://twitter.com/joneaves) suggested either using something like [checkstyle](http://checkstyle.sourceforge.net/) (java) and/or a pre-commit hook. Good advice.

## Use IAM Keys
Quite a few people have pointed out on twitter and hacker news that the other thing you should be doing is using restricted IAM keys.

## More tips on Amazon
A friend pointed out that Amazon has a good security [blog post](http://blogs.aws.amazon.com/security/post/Tx1XG3FX6VMU6O5/A-safer-way-to-distribute-AWS-credentials-to-EC2) that deals with this and other risks to your account.

__Discuss it on [Hacker News](https://news.ycombinator.com/item?id=6911908)__
