---
layout: post
title: "Getting started with Google Maps"
---

My first few searches turned up some fairly unpolished methods of accessing Google Maps from Ruby. I'm definitely using Ruby as a starting point in this challenge, its the language I'm most comfortable with. That's not to say that I'm not going to do any other languages. I do want to do a Python/Django project at some point, just to get it out of the way.
<!--more-->
After bit of digging around I discovered the <a href="http://www.gemcutter.org/gems/ym4r">YM4R</a> gem. YM4R provides access to the <a href="http://www.google.com/apis/maps/documentation/">Google Maps</a> and the <a href="http://developer.yahoo.com/maps/index.html">Yahoo! Maps Building Block</a> API's. Before we go any further lets just get a Google Map on the page and point it at a location. The gem also comes as a plugin for rails, which I'm about to find out has some different capabilities (more on that later).

To do that we need to get an API key <a href="http://www.google.com/apis/maps/signup.html">here</a>. Making sure to put in whatever url you will be using to access your application, in my case, at least for the example application, that's http://localhost:4567. If you're familar with the port number then you know that I'm using Sinatra rather than Rails, this means, is that I can't use the YM4R/GM rails plugin (at least without hacking it up) &amp; unlike the plugin the gem doesn't contain the code to actually generate the map code. So I'm back to the drawing board.

Taking a step back I have a look at how difficult it is to just get it onto the page without a helper, which as it turns out is 'not very'. Lets look at the code to get a minimal example happening:

{% highlight ruby %}
# app.rb
require 'rubygems'
require 'sinatra'

get '/' do
  haml :index
end
{% endhighlight %}

And the view:

{% highlight haml %}
-#views/index.haml
%html
  %head
    %script{:type => "text/javascript", :charset => "utf-8", :src => "https://www.google.com/jsapi?key=ABQIAAAAR21mr2vnfC9-sjIojad2WhSmbtbI58sJnUq1AueY0BvTVoVv3BSw-I1OHpTaa0zZiaSEsDrZf9fGWQ"}
    %script{:type => "text/javascript"}
      google.load("maps", "2");

      // Call this function when the page has been loaded
      function initialize() {
      var map = new google.maps.Map2(document.getElementById("map"));
      map.setCenter(new google.maps.LatLng(37.4419, -122.1419), 13);
      }
      google.setOnLoadCallback(initialize);
  %body
    %h1 Google Maps Example
    %p Welcome to the the Google Maps API example application.
    #map{:style => "width: 794px; height: 491px"}

{% endhighlight%}

It's pretty simple to get a nice looking Google Map onto the page. In the next post I'll go into the details of how to start manipulating the map for our purposes.
