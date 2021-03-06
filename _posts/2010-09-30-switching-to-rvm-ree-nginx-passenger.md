---
layout: post
title: "Switching to RVM+REE+NGINX+Passenger"
---

We're increasing the push toward the release, and I'm now spending precious time looking into the why our Rails Stack is *leaking* workers. My initial research suggested that these workers could be sent a SIGABRT to get them to throw a stacktrace and exit - this hasn't worked however.
<!--more-->
I've been planning to change from the current stack UbuntuProvidedRuby1.8.7+Apache+Passenger to RVM+REE+NGINX+Passenger for a while. With the prerequisite testing done that our app works with the new stack. I've decided that rather than attack this problem head-on I'll use this opportunity to switch and then tackle the problem again if it shows up.

**Update:** After changing the stack it appears to have stopped *leaking* workers - that's a positive outcome to a problem I can't afford the time to look into in more detail. Additionally the before and after performance tests are in:

Apache:
{% highlight bash %}
Server Software:        Apache/2.2.14
Server Port:            80

Document Path:          /
Document Length:        20266 bytes

Concurrency Level:      5
Time taken for tests:   344.008 seconds
Complete requests:      1000
Failed requests:        47
   (Connect: 0, Receive: 0, Length: 47, Exceptions: 0)
Write errors:           0
Total transferred:      20788903 bytes
HTML transferred:       20254908 bytes
Requests per second:    2.91 [#/sec] (mean)
Time per request:       1720.039 [ms] (mean)
Time per request:       344.008 [ms] (mean, across all concurrent requests)
Transfer rate:          59.02 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        4    6   2.5      5      37
Processing:   750 1714 267.2   1668    2922
Waiting:      732 1690 265.8   1645    2900
Total:        755 1720 267.3   1673    2927

Percentage of the requests served within a certain time (ms)
  50%   1673
  66%   1778
  75%   1876
  80%   1886
  90%   2071
  95%   2238
  98%   2389
  99%   2546
 100%   2927 (longest request)
{% endhighlight %}



NGINX:
{% highlight bash %}
Server Software:        nginx/0.7.67
Server Port:            80

Document Path:          /
Document Length:        20266 bytes

Concurrency Level:      5
Time taken for tests:   304.670 seconds
Complete requests:      1000
Failed requests:        0
Write errors:           0
Total transferred:      20798421 bytes
HTML transferred:       20276909 bytes
Requests per second:    3.28 [#/sec] (mean)
Time per request:       1523.352 [ms] (mean)
Time per request:       304.670 [ms] (mean, across all concurrent requests)
Transfer rate:          66.67 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        4    7   3.8      6      43
Processing:   866 1513 266.3   1460    3900
Waiting:      848 1490 264.3   1439    3869
Total:        871 1521 266.6   1468    3905

Percentage of the requests served within a certain time (ms)
  50%   1468
  66%   1562
  75%   1651
  80%   1672
  90%   1779
  95%   1901
  98%   2104
  99%   2373
 100%   3905 (longest request)
{% endhighlight%}
