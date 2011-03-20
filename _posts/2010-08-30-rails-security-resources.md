---
layout: post
title: "Rails security resources"
---

As we make the push toward releasing the platform that I'm working on we've installed [exception_notification](http://github.com/rails/exception_notification) in our Rails app. With the increased visibility of all the exceptions it became apparent quite quickly that there were numerous hits against the server from automated vulnerability scanners. These attempts were causing routing errors as they looked for paths like '/user/soapCaller.bs' - thankfully not targeting Rails applications.

The arrival of this sort of scan was not particularly surprising to me as I've seen similar scans in the past. I've even actively dabbled in some security research by running a few honeypot projects.

Even though these scans usually go after large installations such as Wordpress, Drupal, Joomla and phpMyAdmin, it isn't stupid to take it as a reminder to keep up to date on security vulnerabilities. In the case of Ruby on Rails the starting point would be the [rubyonrails-security](http://groups.google.com/group/rubyonrails-security) google group and the Ruby on Rails [blog](http://weblog.rubyonrails.org).

Another great resource is [Rails Inside](http://www.railsinside.com/?s=security). Rails Inside usually picks up any serious flaws and relays them to the community. In addition to this, they follow new releases of popular plugins/gems that may form part of your app. The site provides an important service because keeping up-to-date is a good way of reducing the risk of being caught by a vulnerability that has been dutifully patched by the maintainer.

The above is certainly not a complete list, so I'd like to hear if there are any other rails/ruby security resources that you find useful.
