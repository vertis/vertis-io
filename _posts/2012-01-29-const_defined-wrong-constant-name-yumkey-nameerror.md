---
layout: post
title: "const_defined? wrong constant name Yum.Key (NameError)"
---
I hate obscure errors. Google wasn't the least bit of help.

The chef solo run was breaking with:

{% highlight console %}
[Sun, 29 Jan 2012 07:22:15 -0500] INFO: *** Chef 0.10.8 ***
[Sun, 29 Jan 2012 07:22:18 -0500] INFO: Setting the run_list to ["recipe[java::openjdk]", "recipe[mysql::server]", "recipe[jenkins::default]"] from JSON
[Sun, 29 Jan 2012 07:22:18 -0500] INFO: Run List is [recipe[java::openjdk], recipe[mysql::server], recipe[jenkins::default]]
[Sun, 29 Jan 2012 07:22:18 -0500] INFO: Run List expands to [java::openjdk, mysql::server, jenkins::default]
[Sun, 29 Jan 2012 07:22:18 -0500] INFO: Starting Chef Run for li231-195.members.linode.com
[Sun, 29 Jan 2012 07:22:18 -0500] INFO: Running start handlers
[Sun, 29 Jan 2012 07:22:18 -0500] INFO: Start handlers complete.
[Sun, 29 Jan 2012 07:22:18 -0500] INFO: Missing gem 'mysql'
[Sun, 29 Jan 2012 07:22:18 -0500] ERROR: Running exception handlers
[Sun, 29 Jan 2012 07:22:18 -0500] ERROR: Exception handlers complete
[Sun, 29 Jan 2012 07:22:18 -0500] FATAL: Stacktrace dumped to /var/chef/chef-stacktrace.out
[Sun, 29 Jan 2012 07:22:18 -0500] FATAL: NameError: wrong constant name Yum.Key
{% endhighlight %}

Bizarre. Looking at the stack trace provided no more clarity. Why was it looking for a constant called 'Yum.Key' in the first place?
 
{% highlight console %}
Generated at 2012-01-29 07:22:18 -0500
NameError: wrong constant name Yum.Key
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/provider.rb:89:in `const_defined?'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/provider.rb:89:in `build_from_file'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:89:in `block in load_lwrp_providers'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:120:in `call'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:120:in `block (2 levels) in foreach_cookbook_load_segment'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:119:in `each'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:119:in `block in foreach_cookbook_load_segment'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:117:in `each'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:117:in `foreach_cookbook_load_segment'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:87:in `load_lwrp_providers'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/run_context.rb:58:in `load'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/client.rb:195:in `setup_run_context'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/client.rb:159:in `run'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/application/solo.rb:192:in `block in run_application'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/application/solo.rb:183:in `loop'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/application/solo.rb:183:in `run_application'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/lib/chef/application.rb:67:in `run'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/gems/chef-0.10.8/bin/chef-solo:25:in `<top (required)>'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/bin/chef-solo:19:in `load'
/usr/local/rvm/gems/ruby-1.9.2-p290@global/bin/chef-solo:19:in `<main>'
{% endhighlight %}

I started digging around in the source (as you do when debugging these type of issues):

{% highlight ruby %}
def build_from_file(cookbook_name, filename, run_context)
        pname = filename_to_qualified_string(cookbook_name, filename)
        
        # Add log entry if we override an existing light-weight provider.
        class_name = convert_to_class_name(pname)
        overriding = Chef::Provider.const_defined?(class_name)
{% endhighlight %}

Having a look into the `convert_to_class_name` and `filename_to_qualified_string` methods was a dead end, they seemed to be working alright.

{% highlight ruby %}
def convert_to_class_name(str)
  rname = nil
  regexp = %r{^(.+?)(_(.+))?$}
        
  mn = str.match(regexp)
  if mn
    rname = mn[1].capitalize

    while mn && mn[3]
      mn = mn[3].match(regexp)          
      rname << mn[1].capitalize if mn
    end
  end

  rname
end
...
 def filename_to_qualified_string(base, filename)
  file_base = File.basename(filename, ".rb")
  base.to_s + (file_base == 'default' ? '' : "_#{file_base}")
end
{% endhighlight %}

I then decided to see what values were being provided to `build_from_file`. Finally, a breakthrough. The `file_name` being provided looked strange `/var/chef/cookbooks/yum/providers/._key.rb`. 

**Where on earth was that coming from!**

The culprit turned out to be the code I was using to copy the cookbooks to the server. Which was picking up the invisible '._' file that Mac OS X uses: [http://support.apple.com/kb/TA20578](http://support.apple.com/kb/TA20578)

{% highlight console %}
tar cj . | ssh -o 'StrictHostKeyChecking no' "$host" '
rm -rf /var/chef &&
mkdir /var/chef &&
cd /var/chef &&
tar xj &&
bash ./provision.sh'
{% endhighlight %}

I worked around the issue by removing those files at the destination with:

{% highlight console %}
rm `find ./  -name "\._*"`
{% endhighlight %}

Not an ideal solution, but it fixed the immediate problem and allowed me to get my Jenkins server installed.
