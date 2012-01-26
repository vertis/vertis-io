---
layout: post
title: "Back from melbourne and SSH Botnets"
---

I've been quiet over the Christmas/New Year period, that doesn't mean that I've left my computer alone on the contrary I been working on some projects that have been waiting for quite a while. The most important of which is a tool to fight back against the hackers and bot networks that have been trying (unsucessfully) to bruteforce servers I own or manage for the last 2-3 years. I have seen other posts about the rise of bruteforcing attacks on ssh servers recently, and the added complexity of those attacks coming from multiple locations (botnet coordinated).

Bruteforce attacks on SSH are nothing new, I remember seeing them as far back as 2005. At the time I was managing about 25 linux servers and the bruteforce attacks would cause accounts to get locked out (which I would then have to unlock). For the most part we dealt with the problem by having a strict hosts.allow/hosts.deny setup (and of course auditing passwords for complexity). Beyond that, I was somewhat powerless to do anything about the attempts.

These days I run a dedicated server and a couple of virtual servers, and I was seeing the same kind of attempts in my logs. Unlike managing someone elses servers though I have the ability to actively fight back against the attacks. So I am.

I started using 'kojoney', an SSH honeypot, but found that while it was fun watching the hackers login and try and compromise a sandbox, it was not what I wanted. So I modified kojoney to log the password used as well (in addition to the username) and setup a ruby on rails project that would record this information, along with the originating IP address, and attempt to login to the IP address with the username/password combo. I called the project mirror, a sort of if you bruteforce me it'll bruteforce you kind of thing.

Then I left it alone. I hadn't expected to see any success. But when I checked the logs a few days later I'd successfully logged into a host in poland. It was a non priviledged account but I backed up everything that the people had uploaded, and changed the password on the account.

A few days later I scored another server, this time a root account. I decided that rather than manually logging in and disabling their access I would go one step further and setup capistrano tasks to secure the box (as much as you can a box that has been compromised at a root level). Not only that but the ssh bruteforcer that had been running on this host had gotten 2 more vulnerable root accounts.

There is typically 2 pieces of software installed on the box. A ssh bruteforcer, and a botnet client, at times there are multiple copies of both, if the host has been compromised multiple times.

So far its ME 4 to Crackers 0. I know the battle isn't over, and that what I'm doing is somewhat grey, but I don't know of a more 'white hat' way of helping stop hackers. If those four servers are managed by people that a *clearly* stupid, then someone has to step into the breach. Now if only I could find somewhere to send the invoice for my time.

I will provide anyone that is a legitimate security researcher with more details (upon request), including copies of the botnet and ssh-scan software (which shouldn't be to hard to get with a regular honeypot anyway).
