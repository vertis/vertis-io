---
layout: post
title: "Exploring Documentum RESTful Services - Part 2"
---

**I originally published this post to the Early Access Area for Documentum RESTful Services.**

In the second part of my exploration of Documentum RESTful Services I  promised that we'd delve into browsing around the docbase. Rather do  that with ruby I thought I'd grab a copy of <a href="http://www.jquery.com">JQuery</a> and have a look at what it takes to access the services using what is an increasingly popular javascript library. The  most important part of delivering on this is the JQuery call:

<blockquote>
<pre>$.getJSON(path, ...);</pre>
</blockquote>

The  important thing here is that because of concerns about cross-site  scripting we can only call local paths. While getJSON allows remote  paths now with the help of JSONP style callbacks, those require server  side cooperation to work. I don't know that they're not implemented in  Documentum RESTful Services, but flipping through the documentation I  couldn't find anything of that nature.

Rather than  creating a War for one html file, I decided to show off nginx. Nginx is a  superb webserver, and more importantly in this case, a reverse proxy.  It has gotten a lot of attention in the Ruby on Rails community, which  is where I fell in love with it. After grabbing a copy of nginx it's  simply a matter of doing a minor adjustment to the nginx.conf file.

<blockquote>
<pre>location /resources {
  proxy_pass   http://127.0.0.1:8080/resources;
}
</pre>
</blockquote>
This  will mean that anything below the /resources directory on our webserver  is passed off to the tomcat instance on 8080. We can start nginx, and  discover it works perfectly. Now that we can use just a path to  reference the services, lets get started. We start with a fairly blank  html file:
<blockquote>
<pre> &lt;html&gt;                                                                 
 &lt;head&gt;                                                                 
 &lt;script type="text/javascript" src="jquery-1.3.2.js"&gt;&lt;/script&gt;         
 &lt;script type="text/javascript"&gt;                                        
   // we will add our javascript code here
   $(document).ready(function() {
        // do stuff when DOM is ready
   });  
 &lt;/script&gt;                                                              
 &lt;/head&gt;                                                                
 &lt;body&gt;                                                                 
   &lt;div id="results"&gt;&lt;/div&gt;                                         
 &lt;/body&gt;                                                                
 &lt;/html&gt;
</pre>
</blockquote>
Notice  the included jquery.js, the call the $(document).ready, and the results  div. We're going to use the call I mentioned earlier 'getJSON' to  populate the results div with the results of calling the 'folders'  resource with no arguments. Lets look at the code.

<blockquote>
<pre>
$.getJSON("/resources/core/repositories/test_repo/folders.json",
       function(data){
       $.each(data.dataPackage.dataObject, function(i,item){
           $("#results").append(item.properties.object_name+"&lt;br/&gt;");
       });
});
</pre>
</blockquote>


If  you put the above html file in the right place and run the example  you'll be prompted for the password, just like you would if you actually  went to the resource endpoint itself, then you'll see a nice list of  the root cabinets. Suppose we want to more than just display the root  cabinets though, that we want to use the returned results to allow us to  click around the docbase. Here is an example that does just that:

<blockquote>
<pre>
  &lt;html&gt;
  &lt;head&gt;
  &lt;script type=&quot;text/javascript&quot; src=&quot;jquery-1.3.2.js&quot;&gt;&lt;/script&gt;
  &lt;script type=&quot;text/javascript&quot;&gt;
      function getItems(path) {
           $.getJSON(path,
                function(data){
                  $.each(data.dataPackage.dataObject, function(i,item){
                     $(&quot;#results&quot;).append(&quot;&lt;a href=\&quot;#\&quot; onclick=&#x27;link(\&quot;&quot;+item.relationshipsUri+&quot;\&quot;);&#x27;&gt;&quot;+item.properties.object_name+&quot;&lt;/a&gt;&lt;br/&gt;&quot;)
                  });
                });
      }

      function getRelationships(path) {
           $.getJSON(path,
                function(data){
                  $.each(data.relationship, function(i,item){
                     $(&quot;#results&quot;).append(&quot;&lt;a href=\&quot;#\&quot; onclick=&#x27;link(\&quot;&quot;+item.target.relationshipsUri+&quot;\&quot;);&#x27;&gt;&quot;+item.target.properties.object_name+&quot;&lt;/a&gt;&lt;br/&gt;&quot;)
                  });
                });
      }

      function link(url) {
           //Needs to be a local path...this is a hack
           //http://127.0.0.1:8080
           var path = url.substring(21, url.length);
           alert(path);
           $(&quot;#results&quot;).html(&quot;&quot;);
           getRelationships(path);
      }

      $(document).ready(function() {
           getItems(&quot;/resources/core/repositories/test_repo/folders.json&quot;);
      });
  &lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
      &lt;div id=&quot;results&quot;&gt;
      &lt;/div&gt;
  &lt;/body&gt;
  &lt;/html&gt;
</pre>
</blockquote>


It's  very rough, and doesn't take into account many variables, such as  relationships that are returned aren't necessarily folders. But it does illustrate the ability to access Documentum using libraries like jQuery now.
