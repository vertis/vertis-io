---
layout: post
title: "Removing a collaborator from all github repos"
---

While Github has support for a feature called [organizations](https://github.com/blog/675-organizations-for-small-businesses) - which, among other things, allow you to manage who has access to all repository. If you have
trouble justifying doubling the cost of your github hosting for these features then you could just use the api to streamline tasks.

In this case we needed to remove a former employee from being a collaborator on the github repositories. So I whipped up a script
using the github api.

While this project hardly needs a Gemfile, my 'new project' script now creates one automatically:

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

It's certainly not a *polished* script, but it does the job. Maybe soon I'll be able to convince my manager to upgrade :)
