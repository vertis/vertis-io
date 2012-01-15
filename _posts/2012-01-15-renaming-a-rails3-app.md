---
layout: post
title: "Renaming a Rails 3 app"
---
Annoyingly Rails 3 spreads whatever name you give it when running 'rails new' over 10 or so files. This makes it hard to setup a base app. The following
shell commands will change the name of the app to the new name:

{% highlight console %}
find . -type f -print0 | xargs -0 perl -pi -e 's/Oldapp/Newapp/g'
find . -type f -print0 | xargs -0 perl -pi -e 's/oldapp/newapp/g'
{% endhighlight %}

I'm a little ashamed that the snippet uses perl instead of ruby. When I was trying to get the equivalent to work in ruby 1.9 it keep complaining about encoding.
