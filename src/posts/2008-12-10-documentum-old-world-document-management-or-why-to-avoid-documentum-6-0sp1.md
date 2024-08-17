---
layout: post
title: "Documentum, old world document management (or why to avoid Documentum 6.0SP1)"
---

I'm sick of raising support cases for things that should just work. I'm frustrated that a product as buggy and unstable as Documentum 6.0 SP1 can be proposed as a solution (by EMC). There are a lot of good things about Documentum, but there is a lot of bloat as well. This will be a growing list of stupid problems that I've found, I'll start with one item and go from there.
<!--more-->
<ul>
  <li>Clicking on 'Save As' on a permission set with a name over a certain length causes it to bomb out. Why? because it tries to give the permission set a temporary name that is longer than the allowed 32 characters. No chance to override this name, no graceful handling, just a fat error message and the chance to reload DA and try again.</li>
  <li>When using LDAPSync (which you probably need to get hotfixed anyway what with it having so many bugs fixed) 'Groups and their member users' does not update the content of mapped attributes even if they change (for instance during a rename).</li>
  <li>My favorite of the last 2 weeks: BOCS and DTS are not supported in the same solution. This problem is related to DTS going looking for content that is still parked on the BOCS server. It's been fixed in 6.5...the problem is that it was EMC that built the solution that we're now using. There is some instability in the DTS services, which is something I have to follow up, but EMC/Documentum had better be hoping that the two are not related.</li>
</ul>
I think part of the problem is that Documentum like a lot of old world enterprise applications has a very tenous hold on some of the techniques that allow for more error free development. I mean was the code even unit tested...
