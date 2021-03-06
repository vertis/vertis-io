---
layout: post
title: "Sinatra on Java"
---

With <a href="http://www.jruby.org/">JRuby</a> and Warbler it's possible to get <a href="http://www.sinatrarb.org">Sinatra</a>, or any WebApp based on Rack, running on a myriad of different Java application servers. There are of course gotchas when it comes to using Warbler with the many different app servers, so this is a definitive guide to everything you have to do to get a simple <a href="http://www.sinatrarb.org">Sinatra</a> app running on the various application servers.
<!--more-->
<strong>Why <a href="http://www.sinatrarb.org">Sinatra</a>?</strong>

There are examples of how to get Rails running on Tomcat and Websphere floating around the web, but I find Rails overkill for small projects. With that in mind, it's worth looking at how to get Sinatra running on java application servers. Besides the weight of rails, Sinatra is a nice, easy to learn framework.

Start by installing <a href="http://www.sinatrarb.org">Sinatra</a> and Warbler. You don't have to be using JRuby to install Warbler, the install will download a gem of the jruby jars.

<strong>Install Sinatra and Warbler</strong>

Lets start by installing the required gems.

<span style="color: #339966;">$ sudo gem install sinatra warbler haml</span>

Haml isn't strictly required, but the template I'm going to use has views generated in haml, so if you're following the tutorial closely you'll want to install it.

<strong>
Create a project folder (and structure)
</strong>

<strong> </strong>I usually keep a sinatra project template handy. So I'm going to clone my existing template off github. You can create a more minimal example than the one I'll download, this will get the job done though.

<span style="color: #339966;">$ git clone git://github.com/vertis/sinatra-example.git deploy_test</span>

TODO: Details about the project

<strong>
Check that our page is displayed</strong>

<span style="color: #339966;">$ rackup</span>

Go to http://localhost:9292/ and you should see our default page.

<strong>Generate the warble config</strong>

<span style="color: #339966;">$ mkdir config &amp;&amp; warble config</span><strong>
</strong>

Lets look at the config file that was generated:

<!-- [gist id=250634] -->
{% highlight ruby %}
# Disable automatic framework detection by uncommenting/setting to false
# Warbler.framework_detection = false

# Warbler web application assembly configuration file
Warbler::Config.new do |config|
  # Temporary directory where the application is staged
  # config.staging_dir = "tmp/war"

  # Application directories to be included in the webapp.
  config.dirs = %w(app config lib log vendor tmp)

  # Additional files/directories to include, above those in config.dirs
  # config.includes = FileList["db"]

  # Additional files/directories to exclude
  # config.excludes = FileList["lib/tasks/*"]

  # Additional Java .jar files to include.  Note that if .jar files are placed
  # in lib (and not otherwise excluded) then they need not be mentioned here.
  # JRuby and JRuby-Rack are pre-loaded in this list.  Be sure to include your
  # own versions if you directly set the value
  # config.java_libs += FileList["lib/java/*.jar"]

  # Loose Java classes and miscellaneous files to be placed in WEB-INF/classes.
  # config.java_classes = FileList["target/classes/**.*"]

  # One or more pathmaps defining how the java classes should be copied into
  # WEB-INF/classes. The example pathmap below accompanies the java_classes
  # configuration above. See http://rake.rubyforge.org/classes/String.html#M000017
  # for details of how to specify a pathmap.
  # config.pathmaps.java_classes << "%{target/classes/,}p"

  # Gems to be included. You need to tell Warbler which gems your application needs
  # so that they can be packaged in the war file.
  # The Rails gems are included by default unless the vendor/rails directory is present.
  # config.gems += ["activerecord-jdbcmysql-adapter", "jruby-openssl"]
  # config.gems << "tzinfo"

  # Uncomment this if you don't want to package rails gem.
  # config.gems -= ["rails"]

  # The most recent versions of gems are used.
  # You can specify versions of gems by using a hash assignment:
  # config.gems["rails"] = "2.0.2"

  # You can also use regexps or Gem::Dependency objects for flexibility or
  # fine-grained control.
  # config.gems << /^merb-/
  # config.gems << Gem::Dependency.new("merb-core", "= 0.9.3")

  # Include gem dependencies not mentioned specifically
  config.gem_dependencies = true

  # Files to be included in the root of the webapp.  Note that files in public
  # will have the leading 'public/' part of the path stripped during staging.
  # config.public_html = FileList["public/**/*", "doc/**/*"]

  # Pathmaps for controlling how public HTML files are copied into the .war
  # config.pathmaps.public_html = ["%{public/,}p"]

  # Name of the war file (without the .war) -- defaults to the basename
  # of RAILS_ROOT
  # config.war_name = "mywar"

  # Name of the MANIFEST.MF template for the war file. Defaults to the
  # MANIFEST.MF normally generated by `jar cf`.
  # config.manifest_file = "config/MANIFEST.MF"

  # Value of RAILS_ENV for the webapp -- default as shown below
  # config.webxml.rails.env = ENV['RAILS_ENV'] || 'production'

  # Application booter to use, one of :rack, :rails, or :merb. (Default :rails)
  # config.webxml.booter = :rails

  # When using the :rack booter, "Rackup" script to use.
  # The script is evaluated in a Rack::Builder to load the application.
  # Examples:
  # config.webxml.rackup = %{require './lib/demo'; run Rack::Adapter::Camping.new(Demo)}
  # config.webxml.rackup = require 'cgi' && CGI::escapeHTML(File.read("config.ru"))

  # Control the pool of Rails runtimes. Leaving unspecified means
  # the pool will grow as needed to service requests. It is recommended
  # that you fix these values when running a production server!
  # config.webxml.jruby.min.runtimes = 2
  # config.webxml.jruby.max.runtimes = 4

  # JNDI data source name
  # config.webxml.jndi = 'jdbc/rails'
end
{% endhighlight %}


If you tried packaging and installing this now, it would fail miserably because, the 'init.rb' file would not be included. The generated warble.rb only includes the following

config.dirs = %w(app config lib log vendor tmp)

In addition to this the gems that we installed above would not be install. Here is same config with the lines we need (and the other cruft removed).
<!-- [gist id=250647] -->
{% highlight ruby %}
Warbler::Config.new do |config|
  config.dirs = %w(app config tmp)
  config.includes = FileList["init.rb"]
  config.gems += ["sinatra", "haml"]
  config.gems -= ["rails"]
  config.gem_dependencies = true
end
{% endhighlight %}

<strong>Package up the War file</strong>

<span style="color: #339966;">$ warble</span>

From here on in we'll be looking at any gotchas, when deploying to the different Application Servers.

Deploy to Glassfish and test (effort: moderate - working: yes)
--------------------------------------------------------------

You can get Suns open source application server from http://glassfish.org. The current stable version of Glassfish 2.1.1, though Glassfish 3 is in active development. The installer comes packaged as a jar file. You can run the installer with

<span style="color: #339966;">$ java -Xmx256m -jar glassfish-installer-v2.1.1-b31g-linux.jar</span>

After accepting the license it should put all the files in a folder called 'glassfish' in the current directory.

$ cd glassfish
You need to run the following commands to finish the setup:

$ chmod -R +x lib/ant/bin
$ lib/ant/bin/ant -f setup.xml

Once the software is installed you can start the domain with:

$ bin/asaadmin start-domain domain1

And use either the admin console or the autodeploy directory to deploy the war file.

Glassfish now has a working copy of our application.

Deploy to JBoss and test (effort: n/a - working: no)
----------------------------------------------------

JBoss has a community and an enterprise edition. For the purposes of this test we'll be using the community edition. The current stable version of JBoss AS is 5.1.0 GA. You can get a copy of JBoss from <a href="http://www.jboss.org">http://www.jboss.org</a>.

Getting started is as simple as unzipping the archive and running:

$ cd jboss-5.1.0.GA

$ bin/run.sh

You can then use the admin console to deploy the application. One gotcha here, the first time I deployed the application using the console I got the following nasty message:

{% highlight bash %}
Application initialization failed: no such file to load -- rack
from /opt/application_servers/jboss-5.1.0.GA/server/default/deploy/deploy_test.war/WEB-INF/lib/jruby-rack-0.9.5.jar/vendor/rack.rb:1
from /opt/application_servers/jboss-5.1.0.GA/server/default/deploy/deploy_test.war/WEB-INF/lib/jruby-rack-0.9.5.jar/vendor/rack.rb:22:in `require'
from /opt/application_servers/jboss-5.1.0.GA/server/default/deploy/deploy_test.war/WEB-INF/lib/jruby-rack-0.9.5.jar/jruby/rack/booter.rb:22:in `boot!'
from /opt/application_servers/jboss-5.1.0.GA/server/default/deploy/deploy_test.war/WEB-INF/lib/jruby-rack-0.9.5.jar/jruby/rack/boot/rack.rb:9
from /opt/application_servers/jboss-5.1.0.GA/server/default/deploy/deploy_test.war/WEB-INF/lib/jruby-rack-0.9.5.jar/jruby/rack/boot/rack.rb:1:in `load'
from &lt;script&gt;:1
{% endhighlight %}

Turns out that after some digging there is an open jruby bug about the issue - 63
http://jira.codehaus.org/browse/JRUBY-3935 (Update: link no longer works, because codehaus is dead)

I also did a bit of digging through the logs and found:

{% highlight bash %}
16:27:50,703 ERROR [STDERR] Warning: JRuby home "/opt/application_servers/jboss-5.1.0.GA/server/default/deploy/deploy_test.war/WEB-INF/lib/jruby-stdlib-1.4.0.jar/META-INF/jruby.home" does not exist, using /tmp
{% endhighlight %}

I've not managed to find a solution to this problem. I will revisit this at some point in the future. After googling a little it may be possible to just revert to a few older versions that seemed to work.

Deploy to Jetty and test (effort: easy - working: yes)
------------------------------------------------------

The current version of Jetty is 7.0.1.v20091125, though the version that comes as part of your Linux distro may not be so up to date. You can either install it using your favorite package manager, or if you're on Windows get it from the homepage at <a href="http://www.mortbay.org">http://www.mortbay.org</a>

Once you've installed Jetty copy the generated war file to the webapps folder, and run:

<span style="color: #339966;">$ bin/jetty.sh</span>

You should be able to go to http://localhost:8080/deploy_test

Congratulations you now have a working copy of your sinatra app on Jetty.


Deploy to Tomcat and test (effort: easy - working: yes)
-------------------------------------------------------

The current stable version of Tomcat is 6.0.20. You can either install it using your favorite package manager, or if you're on Windows get it from the homepage at <a href="http://tomcat.apache.org">http://tomcat.apache.org</a>

You shouldn't have to make any changes to get our web app to work on Tomcat. Once you've installed Tomcat copy the generated war file to the webapps folder, and run:

<span style="color: #339966;">$ bin/startup.sh</span>

You should be able to go to http://localhost:8080/deploy_test

Tomcat really is the bread and butter of Java Application Servers, especially outside the Enterprise.

Deploy to Websphere and test (effort: hard - working: yes)
----------------------------------------------------------

<em>NB: Websphere 6.1.0.11 was the first application server I ever deployed Sinatra too, it failed miserably. I spent a long time debugging and playing with it to make it work properly. The biggest problem stems from the fact that the default way of using rack as configured by warbler doesn't work.</em>

Start by logging into the administration console, it should be something like - http://localhost:9043/ibm/console

Click on 'Servers' and when it expands select 'Application Servers'. From here you can setup a new server instance that we can use for our testing. Call the instance something like 'deploy01'. You can follow the default creation steps all the way through.

Once you have a server instance to test on, you can deploy a new application. The big gotcha as mentioned above is that you can't use filters, the good news is that it's quite easy to switch out the rack filters for a rack servlet. Rather than duplicate information that already exists, I'll link to the place I learned to deploy warbler to websphere, <a href="http://clint-hill.com/2008/11/26/jruby-on-rails-and-websphere/">http://clint-hill.com/2008/11/26/jruby-on-rails-and-websphere/</a>.

Websphere is not the easiest application server to setup in general, but once you get it all configured it is fairly robust. Worth the effort if you want an application server you won't have to restart constantly (as can be the case with Documentum on Tomcat).


Deploy to Weblogic and test (effort: n/a - working: no)
-------------------------------------------------------

Setting up Oracle Weblogic 10.3.2 was nothing short of awesome. The install process is intuitive and speedy, though the size is quite large, at ~600Mb,  compared to smaller cousins such as Tomcat. There is a wizard that walks you through the process of setting up your first domain, what Tomcat would call an instance and Websphere would call a profile, once the software is installed. I chose the default options for everything and had a running Weblogic server in about 20mins (including download).

My previous experience with Weblogic, was the version bundled with Documentum D6SP1. I've found both that version and the current fully fledged Oracle version to be a joy to work with.

Once the installation process is finished you can find the administration console at http://localhost:7001/console, you can then login using the username/password you picked during installation.

From the admin console it is a simple matter of clicking on 'Deployments' on the left and then when the screen loads clicking 'install', browse to the directory with the deploy_test.war file in it and start the install.

You should now be able to access the deployed application at http://localhost:7001/deploy_test...

{% highlight bash %}
Application initialization failed: no such file to load -- rack
from C:/Oracle/Middleware/user_projects/domains/base_domain/servers/AdminServer/tmp/_WL_user/deploy_test/qwtgi/war/WEB-INF/lib/jruby-rack-0.9.5.jar!/vendor/rack.rb:1 from
C:/Oracle/Middleware/user_projects/domains/base_domain/servers/AdminServer/tmp/_WL_user/deploy_test/qwtgi/war/WEB-INF/lib/jruby-rack-0.9.5.jar!/vendor/rack.rb:22:in `require' from
C:/Oracle/Middleware/user_projects/domains/base_domain/servers/AdminServer/tmp/_WL_user/deploy_test/qwtgi/war/WEB-INF/lib/jruby-rack-0.9.5.jar!/jruby/rack/booter.rb:22:in `boot!' from
C:/Oracle/Middleware/user_projects/domains/base_domain/servers/AdminServer/tmp/_WL_user/deploy_test/qwtgi/war/WEB-INF/lib/jruby-rack-0.9.5.jar!/jruby/rack/boot/rack.rb:9 from
C:/Oracle/Middleware/user_projects/domains/base_domain/servers/AdminServer/tmp/_WL_user/deploy_test/qwtgi/war/WEB-INF/lib/jruby-rack-0.9.5.jar!/jruby/rack/boot/rack.rb:1:in `load' from
{% endhighlight %}

Clearly thats not going to be the case though. This issue is very similar to the error message received for JBoss.

Conclusion
----------
Not a bad scorecard really. Of all the Java application servers that I tested, only JBoss and Weblogic proved to be a problem. I'll be retesting these two periodically to see if support has been improved (there are open tickets with JRuby). Until then I hope that this has been useful.
