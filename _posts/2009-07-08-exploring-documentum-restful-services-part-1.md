---
layout: post
title: "Exploring Documentum RESTful Services - Part 1"
---

I was chatting to <a href="http://www.craigrandall.net">Craig Randall</a> on <a href="http://www.twitter.com/craigsmusings">twitter</a> a little while back and he let me know that they were just about ready to go into Early Access for their new web service platform -  Documentum RESTful Services. I was excited then, and I'm even more excited now that I've had my first taste.
<!--more-->
RESTful web services are hard to explain to people. I usually fall back on explaining them by linking them to Ajax, which is a Web2.0 technology that people are more familiar with. If you wanted to use Ajax to make your Documentum webapps more friendly before Documentum RESTful Services, then you'd be out of luck (short of creating a custom server side component).

RESTful web services are easily accessible because you don't need any funky client library to access them. Pop open any web browser and type in:

http://localhost:8080/dctm_rest/resources/core/repositories/&lt;RepoName&gt;/folders

And you'll get back an XML representation of all the root folders (after you're prompted for a username/password). RESTful web services use only standard HTTP, which means that you're cutting out the middleman of having to encode requests/responses in Soap (or some other container).

They're automagically more language agnostic. Gone is the need for a complex client side library. For example, while it should strictly be possible to access DFS in any language, this doesn't translate into a reality. So Documentum RESTful Services will allow us to step away from relying on Java/.Net and expand into using high level dynamic languages (python, ruby, javascript).

Let's do a simple example in Ruby to demonstrate:
<pre class="ruby">require 'rubygems'
require 'httparty'

class DctmRest
  include HTTParty
  base_uri 'http://localhost:8080/dctm_rest'
  def initialize(username, password)
    @auth = {:username =&gt; username, :password =&gt; password}
  end

  def repositories
    options = { :basic_auth =&gt; @auth }
    repository = "test_repo"
    self.class.get("/resources/core/repositories.json", options)
  end
end
d = DctmRest.new('username', 'password')
puts d.repositories.inspect</pre>
The example is probably more complex than it even needs to be. If I look at the output:
<pre class="js">{"repository"=&gt;[{"queriesUri"=&gt;"http://localhost:8080/dctm_rest/resources/core/repositories/test_repo/queries.json", "repositoryType"=&gt;"managed", "typesUri"=&gt;"http://localhost:8080/dctm_rest/resources/core/repositories/test_repo/types.json", "foldersUri"=&gt;"http://localhost:8080/dctm_rest/resources/core/repositories/test_repo/folders.json", "checkedoutUri"=&gt;"http://localhost:8080/dctm_rest/resources/core/repositories/test_repo/objects/checkedout.json", "uri"=&gt;"http://localhost:8080/dctm_rest/resources/core/repositories/test_repo.json", "name"=&gt;"test_repo", "objectsUri"=&gt;"http://localhost:8080/dctm_rest/resources/core/repositories/test_repo/objects.json"}]}</pre>
I can see a very succinct set of other URIs that I can use to get other information. In the next post I'll go through how to browse around a Docbase using Documentum RESTful Services. For now, take the time to <a href="https://community.emc.com/community/labs/dctm_rest">sign up</a> for the early access program, so you can help give feedback on what is a giant leap forward for Documentum in the web2.0 world.
