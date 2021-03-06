---
layout: post
title: "Turn on Authentication Tracing in Documentum Administrator"
---

The following comes in very hand when you're trying to troubleshoot authentication problems. Go into DA and find the Administrative Methods; there should be one called 'SET_OPTIONS'  which allows you to put in trace_authentication and set it to true. All authentication attempts will then be logged to the docbase log.
<!--more-->
A few notes:
<ul>
  <li>If you have a clustered setup you'll need to make sure it gets turned on for both content servers (you can specify which you're connecting to when you login)</li>
  <li>Make sure you turn it off when you're done troubleshooting, it adds a performance overhead not to mention chewing up log space.</li>
  <li>Restarting the content server will cause it to turn off...to turn it off without restarting the content server just set it to false in the same place you turned it on.</li>
</ul>
