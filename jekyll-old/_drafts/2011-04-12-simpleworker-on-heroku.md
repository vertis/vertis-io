---
layout: post
title: "SimpleWorker on Heroku"
---
This is the companion post to the talk I gave at the #rorosyd meetup. I'm really not sure if it's just me, but a lot of the apps
I create require a lot of background processing.

In the past I've tried everything from BackgrounDrb to DelayedJob. Recently quite a few of the apps that I've created have used DelayedJob.

Heroku of course supports DelayedJob out of the box, but at a cost of $36 dollars a month for a single worker. A VM while it doesn't
have the *zero-config* joy of Heroku can support multiple delayed_job workers, has other overheads, like the need to monitor the
workers.

This has caused me to move at least one of my apps away from Heroku to a VM. While a VM may not have the *zero-config* joy of Heroku it
does support running multiple workers for far less cost. This has other downsides though; the need to monitor the
workers, the time to actually manage the server, the loss of a highly available platform.

The solution - simple_worker. simple_worker is a SaaS product that offers a lot of use cases. More importantly, the model used
to charge is based on the amount of compute time a worker uses and the priority place on the worker (more on that later).

Getting Started
===============
Like a lot of new libraries, simple_worker only supports ruby 1.9 (since you're all already using Ruby 1.9 that shouldn't be a problem).

At the moment heroku defaults to 1.8.7, unless you explicitly tell it otherwise. You can do that  when you are creating a new app:

{% highlight console %}
  gem install heroku
  heroku create mybrilliantapp --stack bamboo-mri-1.9.2
{% endhighlight %}

Or, If you have an existing app, you can migrate it with:
{% highlight console %}
  cd mybrilliantapp
  heroku stack:migrate bamboo-mri-1.9.2
  git push heroku master
{% endhighlight %}

Because simple_worker is still in a private beta on heroku, if we want to use it we'll need to set it up in the project manually.

* Sign up for an account at simple_worker.com
* Create a new project

From there you can copy the simple_worker.configure block for your new project

{% highlight ruby %}
simple_worker.configure do |config|
    config.access_key = 'KEY'
    config.secret_key = 'SECRET'
end
{% endhighlight %}

and put it somewhere like 'config/initializers/simple_worker.rb'.

Finally edit 'config/application.rb' and add an entry to autoload from wherever you wish to store your workers.

{% highlight ruby %}
  config.autoload_paths += %W(#{config.root}/app/workers)
{% endhighlight %}

Having added these entries we're now ready to dive into some examples.

SimpleWorker in Practice
========================

Scheduling
----------
For the app that I'm currently working on in my spare time the ability to schedule tasks is a requirement. SimpleWorkers native ability
to handle scheduled tasks is one of the core features that attracted me.

{% highlight ruby %}
require 'simple_worker'

class MyWorker < SimpleWorker::Base

  def run
    log "Starting HelloWorker #{Time.now}\n"
    sleep 3
    log "Done running MyWorker #{Time.now}"
  end

end

worker = MyWorker.new
worker.schedule(:start_at => 3.minutes.since, :run_every => 60, :run_times => 5)
{% endhighlight %}

Working with the Database
-------------------------
{% highlight ruby %}
yaml = YAML.load(File.read(Rails.root+'config/mongoid.yml'))
config = yaml[Rails.env]
worker = MongoidWorker.new
worker.mongo_host = config["host"]
worker.mongo_port = config["port"]
worker.mongo_username = config["username"]
worker.mongo_password = config["password"]
worker.mongo_db = config["database"]
worker.queue
{% endhighlight %}
