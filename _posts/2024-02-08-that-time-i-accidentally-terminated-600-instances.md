---
published: true
layout: post
title: "That Time I Accidentally Terminated 600 Instances"
author: vertis
minutes_read: 3
feature_image:
  url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/1d006da8-0186-4248-c58e-55bc8abfb800/w=800
caption: "DALL-E imagines \"The Zombie Apocalypse\""
meta_description: "That Time I Accidentally Terminated 600 Instances - Otherwise known as \"The Zombie Apocalypse\""
---

# That Time I Accidentally Terminated 600 Instances
## Otherwise known as "The Zombie Apocalypse"

I was reflecting the other day after coming across yet another post on [/r/cscareerquestions](https://www.reddit.com/r/cscareerquestions) from a user fretting about potentially getting fired for a mistake they made at work. In my 20+ years in tech, I’ve made my fair share of [mistakes](/2013/12/16/unauthorised-litecoin-mining), but one of them is more memorable than most.

It was 2012, and the company I worked for at the time had started moving to [AWS](https://aws.amazon.com) in 2011. The first part of this journey involved allowing the ~500-strong tech team to spin up dev environments within a VPC.

To enable this, our team had created a collection of Ruby gems that allowed users to spin up instances and, with configuration complete, create ‘production-like’ environments. This was at a time before [cloud formation](https://aws.amazon.com/cloudformation/) and [Terraform](https://www.terraform.io) became widespread (they both existed but were in their infancy). The tooling took care of creating the instance and tagging it.

Very occasionally, this process would fail, leaving us with untagged running instances that cost the company money. In addition, even the tagged instances would run 24/7, incurring costs when the staff weren’t actually using them.

To combat this, we created a set of cron jobs that would shut down the ‘zombie’ instances and a set of YAML files that allowed users to configure the hours their desired environments would run.

This solution worked well for a while. Unfortunately, shutting down the zombie instances eventually led us to hit the instance limits [AWS](https://aws.amazon.com) has in place for a region. Increasing the limits would only delay the problem, so the decision was made to terminate the instances rather than just shutting them down.

With the hindsight of 2024, there was plenty of bad behavior in the usage of this VPC. Many teams were using automation to spin up environments, but an equal number were then handcrafting the resulting environments, loading data into testing environments. There were plenty of fragile pieces of code/tests, so this wasn’t entirely due to bad behavior; sometimes it was a means to an end. Teams were also self-servicing Jenkins boxes and the like into this VPC.

By the time my story occurs, there were probably 900-1000 instances within this environment.

One morning, we arrived at work to discover a dozen of these instances were missing, including our cron box responsible for turning instances on and off. We investigated but it remained unclear WHY. The code I had written made it trivial to spin this box back up, and my colleague did so, enabling termination protection on the box. A good day’s work.

The next day, however, was not so good. We arrived at work to discover approximately two-thirds of the instances had been terminated. Not the cron box this time, which provided us the logs required to understand what was going on. The only reason we had ANY instances left at all was that [AWS](https://aws.amazon.com) started rate-limiting our little zombie killer job.

The direct cause was a gem dependency of our zombie killer that was now failing to get the tags correctly, thereby deciding that ALL the instances were untagged. Presumably, this happened the prior night, but it self-terminated early in the process.

Work ground to a halt as the impact of this started to hit teams. There would be no recovering these environments. Any missing environment would need to be rebuilt.

Everyone was reasonably good about it. The CIO, CTO, and Engineering managers decided to use this as a teaching moment. Teams that had been using infrastructure as code and good practices were minimally impacted. Other teams were encouraged that NOW might be the time to improve those practices.

I did not lose my job. There was a little ribbing, but nothing that went too far. Eventually, the memory faded a bit, passed down as one of those legends inside the company.

We all mess up. Good companies take it as an opportunity to strengthen the company. Bad companies take it as an opportunity to encourage engineers to work for good companies.

This blog doesn't have comments, but you can share your thoughts on [HN](https://news.ycombinator.com/item?id=39299945).


