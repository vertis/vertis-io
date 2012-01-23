---
layout: post
title: "git: fatal: index file smaller than expected"
---
NB: You should back up your working directory before trying anything in this post.

{% highlight console %}
nomad git:(master) git status 
fatal: index file smaller than expected
➜  nomad git:(master) git reset --hard
fatal: index file smaller than expected
{% endhighlight %}

Uh-Oh-Spaghetti-O's. Not a nice error message to get first thing in the morning. 

After much googling I realized that the .git/index is only used to track staged and unstaged changes. So the simplest way
out of this mess is to move the broken index out of the way.

{% highlight console %}
➜  nomad git:(master) mv .git/index .git/index.backup
➜  nomad git:(master) ✗ git status
{% endhighlight %}

You should now be presented with a rather confused view of the working tree, where it thinks things have been deleted and there is a whole raft of untracked files...

{% highlight console %}
➜  nomad git:(master) ✗ git add .
{% endhighlight %}

And we're back to where we should be.



