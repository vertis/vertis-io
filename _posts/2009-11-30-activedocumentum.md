---
layout: post
title: "ActiveDocumentum"
---

I've finally decided to release ActiveDocumentum.  ActiveDocumentum is a Ruby Gem that I created to bring some of the goodness, learned by pulling apart ActiveRecord, to accessing <a href="http://www.emc.com/products/family/documentum-family.htm">Documentum</a>. Its nowhere near as mature, but I has been doing the job pretty well so far for the scripts and sites I've been using it for. It has a dependency on JRuby because it hooks into the DFS client libraries to facilitate connecting to Documentum. I'm going to post some further examples, but for the time being, here it is.
<!--more-->
<a href="http://www.github.com/vertis/active_documentum">http://www.github.com/vertis/active_documentum</a>

You'll need a Documentum repository, JRuby and a copy of the DFS sdk to play with it.

<strong>Update:</strong> I've also done up a quick sample which you can find on my github (right next door to the actual library).

<a href="http://www.github.com/vertis/active_documentum_sample">http://www.github.com/vertis/active_documentum_sample</a>
