---
layout: post
title: 'Mongrel service tip'
author: 'Luke Chadwick'
published: true
date: '2008-11-12'
minutes_read: 2
---

If you're running rails applications on Windows then you'll be interested in or already use the mongrel_service gem. When I recently (today) tried to install it on a new computer I had trouble because it didn't want to install the dependencies. Apparently it requires a version of the win32-service gem `>=0.5.2` but `<0.6.0`

<!--more-->

```shell
Microsoft Windows XP [Version 5.1.2600] (C) Copyright 1985-2001 Microsoft Corp.
C:\Documents and Settings\Administrator>gem install win32-service -v 0.5.2
C:\Documents and Settings\Administrator>gem install mongrel_service
```

should do the trick

**UPDATE:** Apparently using w32-service causes problems whenever you have defined a class named service. Just be aware that its going to cause it to use w32-services service class rather than your own, regardless of whether you're running mongrel as a service (it won't happen if you don't run mongrel).
