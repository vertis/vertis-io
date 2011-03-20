---
layout: post
title: "Ruby non-greedy matching (OR how interro saved the day)"
---

I've spend most of the afternoon working on a complex regex in order to parse command line argument forms (for lack of a better term). If you've ever run the man command you'll know what I'm talking about. Take the tar command as an example:

{% highlight man %}
tar  [ - ] A --catenate --concatenate | c --create | d --diff --compare
       | --delete | r --append | t --list | u --update | x --extract  --get  [
       options ] pathname [ pathname ... ]
{% endhighlight %}

If you're already familiar with regular expressions you'll know that doing something like:
{% highlight console %}
[\[].*[\]]
{% endhighlight %}

trying to match:

{% highlight console %}
[ - ]
{% endhighlight %}

won't accomplish what you think. Instead of getting just the first set of braces you'll end up with the whole remainder of the string. This is because of a feature, we'll give it that title, called greedy matching. Greedy matching means that it takes the largest possible chunk that your regex will match, which in this case is the ']' on the end of pathname.

I was aware of what was going on, but not being a particular master of regular expressions, I wasn't sure how to get it to stop being greedy. As it turns out its quite easy.


 + .*   - Greedy matching
 + .+   - Greedy matching
 + .*?  - Non-greedy matching
 + .+?  - Non-greedy matching

It could not be easier, once you know about it of course.
