---
layout: post
title: "D6.5 Experiments (Part 1)"
---

Spent most of the night downloading Documentum 6.5 components for Linux &amp; Oracle. While I would prefer to use an open source database like PostgreSQL as the backend, the actual database isn't going to matter much once its installed (they don't offer it as an alternative anyway). What I'm looking to do is have a D6.5 environment that I can tune to be as fast as possible. This includes doing things that you wouldn't be able to do on a System that has to be supported, such as using Nginx as the front end instead of Apache Httpd  with Apache Tomcat.

I'm still a bit up in the air as to which App Server I'm going to use. Tomcat is the obvious answer and the starting point for clients that don't want to invest in IBM Websphere,  BEA(Oracle) Weblogic, or Jboss. I do think that Apache Geronimo and Jetty are worth investigating as alternatives. One of the complaints that I've heard against Tomcat in production environments is that it is ridiculously unstable when running Webtop. With the app servers needing to be restarted every week (or more frequently). IMO there is more likely an issue with Webtop itself rather than Tomcat. I haven't heard of stability complaints when running other webapps.

One of the big complaints against Apache Tomcat is that it isn't a full stack App Server like IBM Websphere, for instance architecturally IBM Websphere has a lot more under the covers. I've not installed Apache Geronimo before but it's supposed to be more of a complete App Server. I'll let you know how my project goes anyway,  got to run off to work now.
