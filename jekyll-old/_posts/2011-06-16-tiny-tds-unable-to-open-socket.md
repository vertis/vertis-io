---
layout: post
title: "TinyTds::Error: Unable to open socket (Sequel::DatabaseConnectionError)"
---

While working on one of our rails apps at work, I got the following error. Since we only recently switched to using TinyTds, I wasn't quite sure what the cause was.
It turns out that in my case I'd switched the VM I run SQL Server on from 'Host only' to 'Bridged'. So the driver couldn't connect to the port.

When in doubt:
{% highlight console %}
telnet hostname 1433
{% endhighlight %}
