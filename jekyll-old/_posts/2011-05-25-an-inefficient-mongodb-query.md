---
layout: post
title: "An inefficient MongoDB query"
---

### Short Version
  MongoDB doesn't support queries using case insensitive regular expressions  against indexes (e.g /blah/i).
<!--more-->
### Long Version
**Firstly: A big thank you goes to Jason McCay from [MongoHQ](http://mongohq.com) for his help on this issue.**

Yesterday morning I received an urgent email from [MongoHQ](http://mongohq.com) regarding one of my databases. According to the email, one of my queries was missing the index. The scale at which these queries were occurring was putting significant load on their server.

The specific query:
{% highlight console %}
Mon May 23 22:47:38 [conn707] query mydb.profiles reslen:441 nscanned:1979415 \
{ address: /^123 Fake Rd, Sydney, NSW 2000$/i }  nreturned:1 44740ms
{% endhighlight %}

And the offending ruby code:
{% highlight ruby %}
  Profile.where(:address => /^#{profile.address}$/i).each do |other|
    other[:lat] = lat
    other[:lng] = lng
    other.save!
  end
{% endhighlight %}

The reasoning behind my code was to find profiles that had the same address, and update them with the latitude and longitude. I considered preventing another request to the geocoding service to be beneficial due to the restrictive limits.

Since I couldn't guarantee that the addresses had been entered with the same case sensitivity, I'd chosen to make the regex insensitive. Sadly, I wasn't aware that MongoDB doesn't support queries using case insensitive regular expressions against indexes (at this time).

A quick fix was to create another column that had an all lower case copy of the address and remove the 'i' from the query. I ran the following script (not necessarily the most efficient way of creating the copy):
{% highlight ruby %}
  Profile.where(:address.ne => nil).each do |profile|
    profile[:lowercase_address] = profile.address
    profile.save!
  end
{% endhighlight %}

And changed my code to the following:
{% highlight ruby %}
Profile.where(:lowercase_address => /^#{profile.address.downcase}$/).each do |other|
  other[:lat] = lat
  other[:lng] = lng
  other.save!
end
{% endhighlight %}

It may have caused the ruby code to be a little bit more intensive, but it sped up the processing considerably.
