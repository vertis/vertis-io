---
layout: post
title: "Removing a collaborator from all GitHub repos"
---

I help manage the [GitHub](http://www.github.com) account for the company I work for. Recently, I've been in a situation where I needed to remove a former colleague from about 25 [GitHub](http://www.github.com) repositories. Admittedly this is only painful because the account we're using is an individual account. Frustratingly, ["Organizations"](https://github.com/blog/675-organizations-for-small-businesses) an account type introduced to deal with this exact issue, is difficult to justify to management because of the additional cost.
<!--more-->
In the meantime I've written a quick script using the [GitHub Api](http://develop.github.com/) that iterates through the repositories and removes a given collaborator. You can find the source code below:

{% highlight ruby %}
#Gemfile
source "http://rubygems.org"

gem 'httparty'
{% endhighlight%}

A library to package up some functionality:

{% highlight ruby %}
#lib/github.rb
require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)

class Github
  include HTTParty
  base_uri 'http://github.com/api/v2/json'

  def initialize(user, pass)
    @username = user
    self.class.basic_auth user, pass
  end

  def repositories
    response = Github.get("/repos/show/#{@username}")
    response.parsed_response["repositories"]  if response.code==200
  end

  def collaborators(repository)
    response = Github.get("/repos/show/#{@username}/#{repository}/collaborators")
    response.parsed_response["collaborators"] if response.code==200
  end

  def remove_collaborator(respository, name)
    Github.post("/repos/collaborators/#{@username}/#{repository}/remove/#{name}")
  end
end
{% endhighlight %}

And the actual script:

{% highlight ruby %}
# remove_user.rb
require 'lib/github'

if ARGV.empty?
  puts "Usage: remove_user <username>"
  exit -1
end

username = ARGV.first

github = Github.new('vertis', 'xxxx')
github.repositories.each do |repo|
  if repo["private"]==true
    puts "Checking: #{repo['name']}"
    collaborators = github.collaborators(repo['name'])
    if collaborators.include?(username)
      puts "Removing '#{username}' from collaborators list of '#{repo['name']}'"
      github.remove_collaborator(repo['name'], username)
    end
  end
end
{% endhighlight%}

It's certainly not a *polished* script, but it does the job. Hopefully, I'll eventually be able to convince my manager to upgrade :)
