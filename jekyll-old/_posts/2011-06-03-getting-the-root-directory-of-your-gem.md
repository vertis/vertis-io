---
layout: post
title: "Getting the root directory of your gem"
---

I've been writing a few gems recently. One thing that you inevitably need to be able to do is find the root directory of your gem.
<!--more-->
Assuming that you place this in 'lib/your_gem.rb', the following code will return the path to the root of your gem:

{% highlight ruby %}
module YourGem
  def self.root
    File.expand_path('../..',__FILE__)
  end
end
{% endhighlight %}
