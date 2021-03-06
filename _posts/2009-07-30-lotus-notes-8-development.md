---
layout: post
title: "Lotus Notes 8 Development"
---

I'm finally finished beating my head against the wall trying to get drag and drop to work in Lotus Notes 8. It turned out to be a good deal less friendly than I expected.
<!--more-->
The actual core of drag and drop listening is stock Eclipse RCP. That'll trigger off the events as expected, but I found that it wasn't passing anything across. After digging down as far as I could to see if it just wasn't processing the transfer properly, I concluded that it was a dead end.

The old way of dealing with this would have been to use NotesUIWorkspace to get the currently selected document. That was never implemented in Java (which is probably because it's not needed). Because of the eclipse architecture, it is strictly possible to access whatever you want using the standard eclipse classes. Thankfully, we don't even have to worry about going this deep, I stumbled across an open source plug-in called <a href="http://www.jeffgilfelt.com/Formul8/">Formul8</a> by <a href="http://www.jeffgilfelt.com/">Jeff Gilfelt</a>. Jeff's plug-in allows you to execute formulas in the context of the currently selected Document(s), which is similar to what I needed.

Under the hood Formul8 is powered by 'com.ibm.lotuslabs.context'. Armed with that discovery, I headed back to google, finding <a href="https://www.ibm.com/developerworks/lotus/library/notes8-context/">this</a> post  about how to use 'lotuslab.context', in addition, it also links to a copy of the source code (yippee!).
