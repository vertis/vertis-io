---
layout: post
title: "List of Rackspace flavors and images"
---
I was recently trying to use the chef command line tool 'knife' to provision a new rackspace server. The tool requires
that you specify the flavor (size) and image(distro version), unfortunately I couldn't find an easily searchable source of this information.

Here is the list of flavors:
{% highlight console %}

1    256 server
2    512 server
3    1GB server
4    2GB server
5    4GB server
6    8GB server
7    15.5GB server
{% endhighlight %}

And here is the list of images:
{% highlight console %}
4        Debian 5.0 (lenny)
10      Ubuntu 8.04.2 LTS (hardy)
14      Red Hat Enterprise Linux 5.4
19      Gentoo 10.1
23      Windows Server 2003 R2 SP2 x64
24      Windows Server 2008 SP2 x64
28      Windows Server 2008 R2 x64
29      Windows Server 2003 R2 SP2 x86
31      Windows Server 2008 SP2 x86
40      Oracle EL Server Release 5 Update 4
41      Oracle EL JeOS Release 5 Update 3
49      Ubuntu 10.04 LTS (lucid)
51      CentOS 5.5
53      Fedora 13
55      Arch 2010.05
56      Windows Server 2008 SP2 x86 - MSSQL2K8R2
57      Windows Server 2008 SP2 x64 - MSSQL2K8R2
58      Windows Server 2008 R2 x64 - MSSQL2K8R2
62      Red Hat Enterprise Linux 5.5
69      Ubuntu 10.10 (maverick)
71      Fedora 14
14362    Ubuntu 9.10 (karmic)
187811  CentOS 5.4
{% endhighlight %}

While this information may go out of date here is the current (1st of April 2011) list. Hopefully it's useful