---
published: true
layout: post
title: "Moped Error"
author: vertis
feature_image:
  url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/60615a3c-c253-403e-cc95-b1a5cc3b0200/w=800
  caption: <span>Photo by <a href="https://unsplash.com/@punttim?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tim Gouw</a> on <a href="https://unsplash.com/s/photos/frustrated?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---
Yet another of my 'obscure error message' posts:

After upgrading an old Rails app from 3.2.x to 4.0.x I started getting a really weird error. Made all the more confusing by the fact that I couldn't work out why it was trying to load Moped (given Mongoid 5.0.0 no longer uses Moped).
<!--more-->
In fact it is trying to load something stored in a cookie. So clearing your cookies will solve this problem.
{% highlight ruby %}
NameError - uninitialized constant Moped:
  activesupport (4.0.13) lib/active_support/inflector/methods.rb:226:in `const_get'
  activesupport (4.0.13) lib/active_support/inflector/methods.rb:226:in `block in constantize'
  activesupport (4.0.13) lib/active_support/inflector/methods.rb:224:in `each'
  activesupport (4.0.13) lib/active_support/inflector/methods.rb:224:in `inject'
  activesupport (4.0.13) lib/active_support/inflector/methods.rb:224:in `constantize'
  activesupport (4.0.13) lib/active_support/core_ext/string/inflections.rb:66:in `constantize'
  activesupport (4.0.13) lib/active_support/core_ext/marshal.rb:10:in `rescue in load_with_autoloading'
  activesupport (4.0.13) lib/active_support/core_ext/marshal.rb:6:in `load_with_autoloading'
  activesupport (4.0.13) lib/active_support/message_verifier.rb:40:in `verify'
  actionpack (4.0.13) lib/action_dispatch/middleware/cookies.rb:405:in `verify'
  actionpack (4.0.13) lib/action_dispatch/middleware/cookies.rb:387:in `[]'
  actionpack (4.0.13) lib/action_dispatch/middleware/session/cookie_store.rb:113:in `get_cookie'
  actionpack (4.0.13) lib/action_dispatch/middleware/session/cookie_store.rb:89:in `block in unpacked_cookie_data'
  actionpack (4.0.13) lib/action_dispatch/middleware/session/abstract_store.rb:51:in `stale_session_check!'
  actionpack (4.0.13) lib/action_dispatch/middleware/session/cookie_store.rb:88:in `unpacked_cookie_data'
  actionpack (4.0.13) lib/action_dispatch/middleware/session/cookie_store.rb:82:in `block in extract_session_id'
  actionpack (4.0.13) lib/action_dispatch/middleware/session/abstract_store.rb:51:in `stale_session_check!'
  actionpack (4.0.13) lib/action_dispatch/middleware/session/cookie_store.rb:81:in `extract_session_id'
  actionpack (4.0.13) lib/action_dispatch/request/session.rb:46:in `block in []'
  actionpack (4.0.13) lib/action_dispatch/request/session.rb:45:in `fetch'
  actionpack (4.0.13) lib/action_dispatch/request/session.rb:45:in `[]'
  actionpack (4.0.13) lib/action_dispatch/request/session.rb:67:in `id'
  rack (1.5.5) lib/rack/session/abstract/id.rb:282:in `current_session_id'
  rack (1.5.5) lib/rack/session/abstract/id.rb:288:in `session_exists?'
  actionpack (4.0.13) lib/action_dispatch/request/session.rb:140:in `exists?'
  actionpack (4.0.13) lib/action_dispatch/request/session.rb:160:in `load_for_read!'
  actionpack (4.0.13) lib/action_dispatch/request/session.rb:86:in `[]'
  warden (1.2.4) lib/warden/session_serializer.rb:30:in `fetch'
  warden (1.2.4) lib/warden/proxy.rb:212:in `user'
  warden (1.2.4) lib/warden/proxy.rb:322:in `_perform_authentication'
  warden (1.2.4) lib/warden/proxy.rb:104:in `authenticate'
  devise (3.5.3) lib/devise/controllers/helpers.rb:124:in `current_user'
  devise (3.5.3) lib/devise/controllers/helpers.rb:120:in `user_signed_in?'
  app/controllers/application_controller.rb:14:in `ensure_user'
{% endhighlight %}
You can fix this problem by running `rake secret` and pasting the result over the current secret token in `config/initializers/secret_token.rb` -- keeping in mind this will log everyone out and prevent the app from accessing anything stored in signed cookies.
