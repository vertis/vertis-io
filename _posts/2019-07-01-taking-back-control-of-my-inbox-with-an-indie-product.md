---
published: true
layout: post
title: "Taking back control of my inbox with an indie\_product"
author: vertis
minutes_read: 9
post_date: Jul 1, 2019 2:13pm
feature_image:
  url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/27856a0a-b04d-43e7-30a3-31d00d236700/w=800
  caption: >-
    <span>Photo by <a
    href="https://unsplash.com/@brett_jordan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Brett
    Jordan</a> on <a
    href="https://unsplash.com/s/photos/email?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
  preview_url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/27856a0a-b04d-43e7-30a3-31d00d236700/w=450
---


One of the most important things about the indie maker community in general is that they have a willingness to explore and understand how we go about making products and providing value. I'm a big advocate for the need to focus on value rather than squeezing every dollar out of a group of people who are willing to pay.

When I think of an indie-made product that is providing value, I have a hard time forgetting [Leave Me Alone](https://leavemealone.app). It's a pretty simple premise, though undoubtedly the execution is harder. Leave Me Alone scans your inbox and helps you to unsubscribe from all the pesky newsletters and spam emails that you receive.

It seems to be the practice that every new SaaS product wants to send you drip emails to keep you engaged. Nevermind if you just wanted a quick look around, now you're on their mailing list(s). Just finding the link to opt-out can be a pain. To add to the frustration they all use different methods of unsubscribing and often require a combination of emailing, confirming unsubscription, and checking checkboxes. All this means that it's not something you can easily do automatically.

I discovered Leave Me Alone in December of 2018 through a couple of tweets in my Twitter timeline. It was a product for which I instantly felt a strong affinity. Yes, I did have an inbox overflowing with newsletters, and no matter how many I seemed to unsubscribe from there were always more right behind.

<div class="my-16 mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
  <p>
    &ldquo;Using Leave Me Alone has resulted in a ~17% drop in emails&rdquo;
  </p>
</div>




After playing with the free version and realising I had received a lot of subscription emails in the last three days, I committed to paying $8 to scan the last six months of my inbox using Leave Me Alone. A few minutes later, I was merrily unsubscribing from newsletters. 238 of them to be precise. In total, I had unsubscribed from 255 newsletters.

Over the next few weeks my inbox felt like a ghost town. The constant stream of alerts when I received new mail on my phone vanished. Unfortunately, this wasn't going to last forever, but it was a great respite.

I was curious about the impact of Leave Me Alone on my inbox. I decided to enlist the product's founders [James](https://twitter.com/JamesIvings) and [Danielle](https://twitter.com/dinkydani21) to help me explore. We are lucky that the indie making community is incredibly open. There are many businesses that are sharing their stats as part of the [Open Startup movement](https://baremetrics.com/open-startups), and Leave Me Alone is one of these businesses who are making a firm commitment to transparency. You can find their stats, including revenue, sales, users, expenses and more at on their [website](https://leavemealone.app/open/).

Given their willingness to be open with their numbers, I wasn't at all surprised when they agreed to help me understand the impact they had on my inbox. This was risky of course, I could have discovered that it had no meaningful impact.
In the interest of keeping things neat I decided to wait until exactly six months after my first "six month scan". It couldn't be truly scientific with a sample size of one, but it would be a start in understanding the value that they're providing the community.

Leave Me Alone is very careful about how they handle data, which meant that I had more access to data about my unsubscribes than they did. However, they pointed me to a private URL that allowed me to view my encrypted data in JSON format, so that I was able to capture the stats of my previous and new scans.

## The findings (and some caveats)
When Leave Me Alone scans your inbox it uses a variety of methods to detect emails from which one can unsubscribe. For the purposes of this article I'm going to refer to these emails as "subscription emails". That is, emails that are behaving correctly and are in some way presenting the ability to unsubscribe.

My first scans 6 months ago resulted in me unsubscribing from 255 subscription emails.

6 months later Leave Me Alone found 169 unique subscription emails from my second scan. Of those, I could only find about 90 from which I wanted to unsubscribe. So far so good. Less than half the number the second time around.

It is worth noting that the first time I also left some, though didn't bother to keep records, so the number returned from the original scan was somewhat higher than 255.

Digging into the 90 from the second scan revealed that most were just things that I'd signed up for over the last 6 months. Some companies have several different lists, so it doesn't actually take that many signups to get to 90 unique unsubscribes.

Most of the emails I had previously unsubscribed from seemed to be gone forever. I was very happy with this, having failed for so many years to successfully unsubscribe from all those lists. When you're unsubscribing manually, it feels like you're not making any difference, consequently you feel frustrated when the next email comes. It is easier to just delete the emails than spend time to search for how to unsubscribe, but that is only a temporary solution.

A handful of senders (who shall remain nameless) seemed to have ignored my unsubscribes. They do this at their own risk - I know of examples of [companies in Australia being fined significant amounts of money](https://www.smh.com.au/technology/graysonline-fined-record-165000-for-spam-20131009-2v78c.html) for not unsubscribing people when requested. In the US the [CAN-SPAM Act](https://www.fcc.gov/general/can-spam) prohibits such behaviour, even if policing it can be troublesome.


<div class="my-16 mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
  <p>
    &ldquo;Leave Me Alone has reduced the number of interruptions in both my work and personal life, allowing me to focus better and be more productive&rdquo;
  </p>
</div>



When looking at the total volume of emails for each period, I was surprised. My total number of emails was roughly double in the most recent period. Not the way that I expected it to go. However, it turned out to be easy to explain; over the last 6 months I've been working on a contract which resulted in a large number of GitHub emails. This was a new phenomenon because previously these emails had gone to work addresses.

After being spammed daily I eventually changed my GitHub settings to send the contract emails to my work address again.

## The raw numbers
Here are the raw numbers for all the emails that I've received over the two periods, as counted by Leave Me Alone:

<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-sm font-medium text-gray-500 truncate">
        First 6 Month Scan<br/>(22st June 2018–21st Dec 2018)
      </dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        3,433 emails
      </dd>
    </div>
  </div>

  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-sm font-medium text-gray-500 truncate">
        Second 6 Month Scan<br/>(22nd Dec 2018–21st June 2019)
      </dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        2,828 emails*
      </dd>
    </div>
  </div>
</dl>
*(plus an additional 3,138 from GitHub which have been discounted, for the reasons above)

Ignoring the GitHub subscriptions, that's 600 fewer emails than the 6 months prior to the 21st of December.

I also decided to check the numbers on my side. This proved to be a little tricky without resorting to code. The way that Google counts is by conversations rather than emails. By Googles count I had received 667 "conversations" from GitHub. This makes sense because GitHub sends multiple emails following Pull Requests and the like.

After deleting the GitHub conversations, here are the numbers from my side.

<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-sm font-medium text-gray-500 truncate">
        First 6 Month Scan<br/>(22st June 2018–21st Dec 2018)
      </dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        2,881 conversations
      </dd>
    </div>
  </div>

  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-sm font-medium text-gray-500 truncate">
        Second 6 Month Scan<br/>(22nd Dec 2018–21st June 2019)
      </dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        2,265 conversations
      </dd>
    </div>
  </div>
</dl>

Regardless of whether you count by distinct emails or by conversations, the results show 605 and 596 fewer emails, respectively. This is a distinct improvement to the volume of emails that come to my inbox.

## The conclusion
Using [Leave Me Alone](https://leavemealone.app) has resulted in approximately 3 fewer emails to deal with a day, or a ~17% drop in emails.

<div class="my-16 mx-auto text-center text-xl leading-9 font-light italic text-gray-900">
  <p>
    &ldquo;We created Leave Me Alone to help people take back control of their inbox and to reduce the impact of spam emails on the world. We loved helping Luke explore his data and being a part of this case study. Luke managing to save more than an entire work day of time, showing that we are providing real value and making us very happy!&rdquo; - Danielle, Co-founder of Leave Me Alone
  </p>
</div>

If we estimate that you spend [1 minute](https://frontapp.com/blog/2018/07/20/how-much-time-are-you-spending-on-email/) per email, then over 6 months I've saved myself 10 hours of effort. More than a full work day saved each 6 months is pretty incredible. Although it can be hard to quantify, reduced overall volume of email means spending less time classifying and categorizing emails.

There are few conclusions that I've drawn from this. I was uncertain whether I would ever need to clear my inbox again after the first scan. I was wrong on this count. It's something that needs to be repeated periodically or the numbers start to creep back up.

<div class="my-16 mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
  <p>
    &ldquo;Leave Me Alone could save a 10 employee development team ~$10k a year&rdquo;
  </p>
</div>


The $8 is fantastic value. Less than $1 per hour saved (by my estimates).

It's very clear to me that this is a product that is providing value. If it can provide value for individuals, how much more value can it provide a company, where it is estimated that employees spend up to [28% of their time](https://www.mckinsey.com/industries/high-tech/our-insights/the-social-economy) on emails.

The cost for a mid-level software developer is between AUD $600–800 a day. This takes into account things like computer equipment and the cost of running the building. Leave Me Alone could save a 10 employee development team ~$10k a year. My previous employer with nearly 400 technical staff could potentially save a cool $400k a year.

Reducing the volume of emails has other benefits too. Leave Me Alone has reduced the number of interruptions in both my work and personal life, allowing me to focus better and be more productive. As a result, I receive fewer notifications, I have more time to engage with the emails which will benefit me, and my inbox is no longer a vortex of distraction.

[Leave Me Alone](https://leavemealone.app) will continue to play a big part in my mission to reduce interruptions from technology and take back control of my time.

## Final Notes
Leave Me Alone are in the process of making it even easier to clean your inbox. Their next release will bring several changes including; attaching all of your email accounts to a single LMA account to unsubscribe from all your spam emails in one go, shifting the pricing model to credit-based instead of time-based so you only pay for what you want to unsubscribe from, and a ranking system they call Subscriber Score to determine which emails are worth keeping.