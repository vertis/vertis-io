---
published: true
layout: post
title: "LitJSON causes System.MissingMethodException : No parameterless constructor defined for this object."
author: vertis
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
var jsonObject = JsonMapper.ToObject<Widget>(res.body); 
{% endhighlight %}

Works much better when you're not trying to shove a Map into a string.
