---
published: true
layout: post
title: Convert an AWS Route53 Resource Record Set to point to an Alias Target
author: vertis
feature_image:
  url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/289cb4b2-3225-4142-6187-375f89e4aa00/w=800
  caption: >-
    <span>Photo by <a
    href="https://unsplash.com/@ffstop?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Fotis
    Fotopoulos</a> on <a
    href="https://unsplash.com/s/photos/programming?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
  preview_url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/289cb4b2-3225-4142-6187-375f89e4aa00/w=450
---

Occasionally, you'll want to change a Route53 Resource Record Set from one type to another. In the case of going from a traditonal '**A**' record to an [Alias Target](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingAliasRRSets.html) the following code (with the aws-sdk rubygem) should do the trick.
<!--more-->

The gotcha with this process is the need to unset ttl and resource_records as a part of the update.

{% highlight ruby %}
zone = AWS::Route53.new.hosted_zones.select { |z| z.name == 'example.com.' }.first # find zone by name
rrset = zone.rrsets.create('jedi.example.com.', 'A', { :ttl => 60, :resource_records => [{ :value => '127.0.0.1' }] })

# Now lets update it to be an alias target
stack = AWS::CloudFormation.new.stacks['jedi-stack'] # assuming the stack exists

lb_resources = stack.resources.select {|x| x.resource_type == 'AWS::ElasticLoadBalancing::LoadBalancer' }
lb_resource = lb_resources.first

lb = AWS::ELB.new.load_balancers[lb_resource.physical_resource_id]

rrset.alias_target = { dns_name: lb.canonical_hosted_zone_name, hosted_zone_id: lb.canonical_hosted_zone_name_id, evaluate_target_health: false }
rrset.ttl=nil if rrset.ttl
rrset.resource_records=nil if rrset.resource_records
rrset.update
{% endhighlight %}

You should now have a RRSet pointed at your ELB.
