---
published: true
layout: post
title: "LitJSON causes System.MissingMethodException : No parameterless constructor defined for this object."
author: vertis
feature_image:
  url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/22d2d979-e53f-41a9-267a-bea36fbfd100/w=800
  caption: <span>Photo by <a href="https://unsplash.com/@maxchen2k?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Max Chen</a> on <a href="https://unsplash.com/s/photos/error?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---
Filing another report under hard to google errors, which seems to be my primary reason for posting on this blog these days.

Was working with LitJSON in C# to deserialize an API response. When I started getting `System.MissingMethodException : No parameterless constructor defined for this object.`.

This error message is too generic to Google, and there is nothing in the results related to LitJSON really. Turned out I had a really simple problem though.

My class was something like this

{% highlight csharp %}
{% raw %} 
public class Foo {
  public string bar
}
{% endraw %} 
{% endhighlight %}

When in reality to JSON was:

{% highlight json %}
{% raw %} 
{
  "bar": {}
}
{% endraw %} 
{% endhighlight %}

Calling:

{% highlight csharp %}
var jsonObject = JsonMapper.ToObject<Foo>(res.body); 
{% endhighlight %}

Works much better when you're not trying to shove a Map into a string.
