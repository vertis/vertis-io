---
layout: post
title: "The 0th law of security"
---

There are supposedly 10 laws of security. Laws that are a firm basis for understanding computer security. They're obviously not the be all and end all of computing security, but for beginners and those that aren't going to focus on security they're an important start.
<h3>The Ten Immutable Laws of Security</h3>
Microsoft's Security Response Center Manager, Scott Culp, as a part of his job produced a list He calls "The Ten Immutable Laws of Security."
<!--more-->
They are:
<ol>
  <li><strong>If   a bad guy can persuade you to run his program on your computer, it's   not your computer anymore.</strong></li>
  <li><strong>If   a bad guy can alter the operating system on your computer, it's   not your computer anymore.</strong></li>
  <li><strong>If   a bad guy has unrestricted physical access to your computer, it's   not your computer anymore.</strong></li>
  <li><strong>If   you allow a bad guy to upload programs to your Web site, it's not   your Web site any more.</strong></li>
  <li><strong>Weak   passwords trump strong security.</strong></li>
  <li><strong>A   machine is only as secure as the administrator is trustworthy.</strong></li>
  <li><strong>Encrypted   data is only as secure as the decryption key.</strong></li>
  <li><strong>An   out-of-date virus scanner is only marginally better than no virus   scanner at all.</strong></li>
  <li><strong>Absolute   anonymity isn't practical, in real life or on the Web</strong></li>
  <li><strong>Technology   is not a panacea.</strong></li>
</ol>
Even without further explanation (which is available from <a href="http://www.microsoft.com/technet/columns/security/10imlaws.asp">here</a>) it is a fairly straight forward and common sense list of laws.
<h3>Law 0</h3>
The fact is that these laws don't go far enough towards describing the problems that are faced by everyday users on the internet. Security people often forget that its not just big companies that are the target of attacks; they may indeed be the target of more personalized attacks
<ol>
  <li>If   you can't read the source code for your operating system (and applications) then it's not your computer anymore.</li>
</ol>
I hate being the open source advocate, but the fact remains that if you and the community can't get into the source code for auditing and patching purposes then its not your computer its Microsoft's. You are essentially relying on their good will and the competency of their programmers to protect you against any flaws in the operating system that may let attackers in.

Microsoft has in the recent past finally hopped on the security band wagon, they're better than they used to be, but its still them against the world, and in practical terms this makes for an impossible situation. The odds are that one of the millions of hackers is going to find it before Microsoft does. Even with their ability to look at the source code they're still vastly outnumbered.
<h3>Open Source</h3>
Open Source is not a complete solution to this problem, but its better. The millions of security researchers out there, the developer community and the general public all get the chance to look for flaws in the code. Immediately once it's discovered a patch is written for it. Unlike a situation where you have to wait for a company to release a patch, you have the ability to patch the problem yourself, its not you against the world though. It's you and every other technically competent person that uses that particular software against the world.
Yes, hackers have the same opportunity of finding the flaws. But the playing field is more level. Even if they do find a flaw, chances are that it'll be patched much more quickly than if millions of eyes weren't looking at the source code.
<h3>Open Source vs. the Other Ten</h3>
When you look at open source as a solution to the problem above; it puts them in a whole new light. Let's start with No. 7, not because of the fact that it's a good number, more the fact that it has long been the belief of the scientific community that closed encryption algorithms are useless.
<ol>
  <li><strong>Encrypted   data is only as secure as the decryption key.</strong></li>
</ol>
While this deals with the key that is used to encrypt the data I would go further and say, that encrypted data is only as secure as the <em><strong>Algorithm </strong></em> and Key that is used to encrypt the data. It doesn't take genius to work out that even if I encrypt my information using my own proprietary method that doesn't mean that it's safe. Unless someone else can test my encryption method, and try and break it, I have no way of knowing whether my information is protected by the encryption; because, I have no way of knowing whether my encryption algorithm is sound, or whether there are fatal flaws in my design.
History is littered with examples of this, and if you look closely at companies like RSA you will notice that they post challenges, trying to get people to break their encryption.More importantly if you can't look at the encryption algorithm and analyse it for yourself, how are you to know that the creator hasn't put in a backdoor for themselves, or governments to use.
<h3>Watching the Watchers <strong></strong></h3>
<blockquote><strong>An   out-of-date virus scanner is only marginally better than no virus   scanner at all.</strong></blockquote>
<ol></ol>
Nearly everyone that I know, knows to use a virus scanner now, its slightly harder getting them to workout Spyware and AntiSpyware programs, but here's the twist, if you can't look at the internals of the anti virus, how do you know that its doing an adequate job of protecting you.
I'm not trying to say you should be using Linux because of the fact that it is less prone to viruses, the fact is that most viruses are written for windows, and if everyone switched to Linux, then those same people would target Linux. It remains to be seen how well Linux would respond to this kind of problem.
What I am saying is the applications that you pay good money for, you subscribe to a service by Symantec or McAfee, and you really have no idea how well you are being protected. The same goes for firewalls, and any other piece of security software that you use to protect your computer. If you can't look at the internals then you have no idea what the application is really doing.
You can apply this same principal to at least some of the other laws, and in truth it serves to cement the 0<sup>th</sup> law in place.
<h3>Regarding Patches</h3>
It is not often that I have the chance to talk about security, but one of the things that occurred to me in my day to day work is the fact that Microsoft's move to allow only 'Genuine' users to download patches and applications, most notably SP2 and Microsoft AntiSpyware, was a foolish one.
Regardless, of the fact that most if not all of my clients have legal copies of Windows, it is rare that they keep them patched and up to date (I tend to fix this), but it leads me to believe that there is a large number of legal windows users out there that don't patch their computers properly.
Now, it's not overly smart of them, but the fact of the matter is that denying patches and other downloads to 'non genuine' users, ends up negatively affecting even those with legal copies in a round about way; look at it like this:
<strong>the greater the number of unpatched computers on a given network, the more chance that a bad guy/worm will get in."</strong>
This is easy to apply, but what is more important is that it takes into account not just small local networks, but the internet as well. The more unpatched computers that remain on the internet, the more chance that the bad guy will get control of them; and the more computers that are either part of botnets, or infected by viruses the easier it is for it to spread, or the attacker to use the given host as a base for another attack.
<h3>A Note on Piracy</h3>
I'm not in anyway condoning &amp; supporting piracy, but there comes a point when you need to accept that a problem isn't going to be solved and make smart moves. Becoming tight and vindictive about piracy only makes the given company *cough*Sony*cough* look bad.
Locking your legitimate users out is bad methodology, and putting so many 'copy protection' methods into a given technology that it negatively affects it is not healthy either. Security is important, but it needs to protect the interests of the user not the interests of the greedy Mega Corporation.
