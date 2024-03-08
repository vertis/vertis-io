---
published: true
layout: post
title: "Mount an S3 bucket using IAM roles"
author: vertis
feature_image:
  url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/02a3b630-76d0-4343-5692-c526c8476800/w=800
  caption: <span>Photo by <a href="https://unsplash.com/@frantic?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Alex Kotliarskyi</a> on <a href="https://unsplash.com/s/photos/programming?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---
After much searching around I discovered that newer versions of s3fs support IAM roles (I'm using 1.77). Unfortunately, this functionality is barely documented.

<!--more-->

I ended up using the following line to mount my directory:

{% highlight bash %}
s3fs bucketname /mnt/bucket -o use_cache=/tmp,allow_other,iam_role=`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/`
{% endhighlight %}
NB: s3fs does not need s3://

If the role you're trying to use does not have access you'll get something like this:

{% highlight bash %}
$ ls /mnt
total 20
drwxr-xr-x 5 root root 4096 Jun 16 23:39 .
drwxr-xr-x 7 root root 4096 Jun 16 23:39 ..
d????????? ? ?   ?       ?            ? bucket
{% endhighlight %}

The other error message I've seen is:

{% highlight bash %}
touch: cannot touch ‘/mnt/bucket/test.txt’: Transport endpoint is not connected
{% endhighlight %}

This happened when I specified the role incorrectly (it does not need to be the full arn).
