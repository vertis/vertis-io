---
layout: post
title: "Quick Reminder: ssh-copy-id on Mac OS X"
---

Mac OS X for some reason lacks the ssh-copy-id shell script. You can install ssh-copy-id on Mac OS X using either ['homebrew'](http://mxcl.github.com/homebrew/) or ['macports'](http://www.macports.org). Since it is a fairly trivial script you could also choose to copy it from various sources manually.

e.g:
{% highlight bash %}
curl https://github.com/beautifulcode/ssh-copy-id-for-OSX/ssh-copy-id.sh \
      -o /usr/local/bin/ssh-copy-id chmod +x /usr/local/bin/ssh-copy-id
{% endhighlight %}
