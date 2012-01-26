---
layout: post
title: "Rack - NoMethodError: undefined method `call' for nil:NilClass"
---

Turns out Rack doesn't read minds. I just spent the better part of the morning troubleshooting a stupid error, convinced there was something wrong with JRuby/Rack/Sinatra. As it turns out the error was caused by having a blank config.ru file,  I was editing one that was in a different directory (and believing that it was the correct file). My own stupidity aside, the error message wasn't helpful, mostly because google didn't return any results related to the same error. So while this admits my mistake, hopefully the next person who comes across this error will spend less time scratching their heads.

{% highlight console %}
NoMethodError: undefined method `call' for nil:NilClass
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/rack-1.0.0/lib/rack/lint.rb:35:in `call'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/rack-1.0.0/lib/rack/showexceptions.rb:24:in `call'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/rack-1.0.0/lib/rack/commonlogger.rb:20:in `_call'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/rack-1.0.0/lib/rack/commonlogger.rb:13:in `call'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/rack-1.0.0/lib/rack/content_length.rb:13:in `call'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/rack-1.0.0/lib/rack/chunked.rb:15:in `call'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/rack-1.0.0/lib/rack/handler/mongrel.rb:61:in `process'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/mongrel-1.1.5-java/lib/mongrel.rb:159:in `process_client'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/mongrel-1.1.5-java/lib/mongrel.rb:158:in `each'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/mongrel-1.1.5-java/lib/mongrel.rb:158:in `process_client'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/mongrel-1.1.5-java/lib/mongrel.rb:285:in `run'
C:/development/langs/jruby-1.3.1/lib/ruby/gems/1.8/gems/mongrel-1.1.5-java/lib/mongrel.rb:285:in `initialize'
127.0.0.1 - - [09/Sep/2009 11:24:45] "GET / HTTP/1.1" 500 40410 0.1720
{% endhighlight %}
