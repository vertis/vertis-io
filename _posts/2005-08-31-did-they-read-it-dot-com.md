---
published: true
layout: post
title: "DidTheyReadIt.com - Worth the Risk?"
author: vertis
minutes_read: 4
feature_image:
  url: /assets/img/didtheyreadit-20050831.png
  caption: didtheyreadit.com
---
More than once I have wanted to know whether a message has been successfully recieved and read. Mostly my desire to check, is based on my mistrust of email rather than a desire to invade the privacy of the person I'm sending email to. Yeah I'm aware of read reciepts but, mostly they're clunky and rely on the users willingness to track you recieving the email. A revolutionary service from [DidTheyReadIt.com](http://www.didtheyreadit.com) changes all that. By taking the address that your sending to [example@example.com]() and reformatting so it becomes [example@example.com.didtheyreadit.com]() you can invisibly check when people are reading your message.

It's tempting, but there are so many problems and potential risks for a privacy and security point of view that I don't believe it's worth the perceived benefits.

It works like this. Your email message is sent off to the didtheyreadit.com mail server, at which time the email is edited and the following html lines inserted at the bottom of the message.

{% highlight html %} 
<div>
<img src="http://xpostmail.com/878cacc2d2a9f6a7e23a0d2d0dbada05worker.jpg" 
    nosend="1" 
    name="dtri" 
    width="1" 
    height="1">
<link href="http://xpostmail.com/878cacc2d2a9f6a7e23a0d2d0dbada05.css" 
    hreflang="dtri" 
    rel="stylesheet" 
    type="text/css">
</div>
{% endhighlight %} 

Assuming of course that the client recieving your email supports HTML messages, this causes a hit to be reported for the image and css file. Since it is a unique file, generated for the specific purpose of tracking your message, Its not hard to link it back to the fact that the message has been recieved & read. The actual tracking emails that get sent out are more complicated than that, but the basic idea is that by tracking the hits for a file one can be sure that the email has been read.

There are several potential issues one must face when using a service such as this. Firstly, by sending your mail off to this service you are allowing someone access to your potentially private conversations. Yes its possible to use PGP to avoid this fact, and it has always been true that email is bounced from server to server (any of which may read your email) anyway. Still it opens up new possibilities. The second issue is that it enables the company in question to gather personal identifiable information(PII), besides the obvious email addresses of the people you are sending to, there is also the fact that it allows the collection of the following items:


* Service Provider + IP Address
* Operating System + Email Client
* Approximate Location (It guessed Sydney AUST)
* Antivirus Information (Sender Only)
* When the email was read (and for how long)

This is certainly not an all inclusive list, because it doesn't deal with other less tangible factors, such as reading habits, that can be built up over time. While there is no evidence to suggest that this company is doing anything of the kind, there is no guarantee that future providers of similar services will not exploit the technology in exactly the method I am suggesting. There is a glut of adware/spyware out on the net that invades peoples privacy, and this technology has the potential to do to reading email, what spyware has done to browsing the net.

For the technically minded, there is no reason that you couldn't implement this method of tracking emails yourself if you have access to a webserver and a smtp server. It does provide the added protection of controlling who is doing the tracking, it begs the question though; are you violating privacy by tracking emails or is it just symptomatic of a system that is flawed in the first place?

## The Next Step
The next step is even scarier. Not only could this technology be used to track you reading the email, but if you were to forward the email to someone the site would be able to tell that it had been read by two different IP Addresses/Computers/Email Clients. In fact if you take this a step further it could potentially be used by automatic spambots and viruses to find live targets susceptable to attack.

## Conclusions
DidTheyReadIt is really not worth the risk. While email isn't fully secure or private as it stands currently, adding items like this only make it worse. If you do want to have quicker conversations then it's probably worth using AIM or MSN messenger.