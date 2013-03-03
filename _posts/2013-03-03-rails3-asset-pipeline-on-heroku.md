---
layout: default
published: true
---

# Asset compilation doesn't run on heroku when deploying a Rails 3.x application

Another of my 'I just wasted a bunch of time trying to work out why something was broken' blog posts.

This morning I was having a problem where the rails asset compilation wasn't triggering when deploying an application to heroku. Googling for the problem resulted in a lot of people that were having errors, but no information about a complete lack of running.

Thankfully the code that does the setup is all open source, so I spent some time digging through `https://github.com/heroku/heroku-buildpack-ruby` to work out what was going wrong.

It didn't take too much digging til I realised that the task was being wrapped in a check:

```
if rake_task_defined?("assets:precompile")
```

This results in a `--dry-run` call. As seen below:

```
  # detects if a rake task is defined in the app
  # @param [String] the task in question
  # @return [Boolean] true if the rake task is defined in the app
  def rake_task_defined?(task)
    run("env PATH=$PATH bundle exec rake #{task} --dry-run") && $?.success?
  end
```

Unfortunately, this also fails silently if there is a problem.

Heroku provides a `run` command. So we can check directly what is wrong:

```
heroku run env PATH=\$PATH bundle exec rake assets:precompile --dry-run
```

In my case it was complaining about a lack of nokogiri during the compilation (even though it was a dry run).