---
published: true
layout: post
title: "Rails 3.2 Precompile error"
author: vertis
feature_image:
  url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/796fa51c-4220-487a-0cb4-f843ba849e00/w=800
  caption: <span>Photo by <a href="https://unsplash.com/@jaimedantas?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jaime Dantas</a> on <a href="https://unsplash.com/s/photos/ruby-on-rails?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

Every so often I come across an exception that doesn't turn up good search results as a solution. This time it was:

{% highlight bash %}
$ rake assets:precompile --trace
...
NoMethodError: undefined method `empty?' for nil:NilClass
  (in <snip> /app/assets/stylesheets/application.css.scss)
<snip>/.rbenv/versions/2.1.2/lib/ruby/gems/2.1.0/gems/sass-3.1.16/lib/sass/tree/root_node.rb:23:in `render'
{% endhighlight %}

<!--more-->

The hint to the problem is actually in the above error, but without context would be difficult to spot (I didn't see it *with* context)

The app in question is now a rails 3.2 app. However it didn't start it's life that way, it was slowly upgraded from 2.x, and had it's own asset handling. The error occurred during a migration to the standard asset pipeline.

Sure enough I had `gem 'sass-rails', '~> 3.2.0'` in one area of the Gemfile and `gem 'sass', '3.1.16'` in another.
