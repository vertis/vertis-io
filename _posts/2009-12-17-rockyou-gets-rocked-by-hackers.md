---
layout: post
title: "RockYou gets rocked by hackers"
---

(And I'm hilarious)

Seems that simple lessons don't get learned. Don't get get me wrong, its very hard to protect every aspect against hackers who try to pry they're way into your site. Storing passwords in plain-text is just dumb though. Even if the passwords for your own site are hashed, the proliferation of storing third party login details (which you could still encrypt with a symmetrical key) is a time bomb.
<!--more-->
<a href="http://igigi.baywords.com/rockyou-com-exposed-more-than-32-millions-of-passwords-in-plaintext">RockYou</a> is just the latest site on the internet to learn this hard lesson. Supposedly the hacker is one of the good guys, but there is no guarantee that someone else didn't get the information as well. It's an argument for doing away with passwords altogether, how long will it be until we can use public/private key authentication with websites. It is now accepted best practice with SSH, since the advent of widespread SSH bruteforcing.

Private key authentication solves a lot of the problems with websites storing password information, the hacker would have gained nothing besides the ability to verify users were who they claimed to be.
