---
published: true
layout: post
title: "Mount an S3 directory using IAM roles"
author: vertis
---
After much searching around I discovered that newer versions of s3fs support IAM roles. Unfortunately, this functionality is barely documented.

I'm documenting what I had to do here, to hopefully save others some time.

I ended up using the following line to mount my directory:

```
s3fs bucketname /mnt/bucket -o use_cache=/tmp,allow_other,iam_role=`curl http://169.254.169.254/latest/meta-data/iam/security-credentials/`
```
NB: s3fs does not need s3:// 

If the role you're trying to use does not have access you'll get something like this:

```
$ ls /mnt
total 20
drwxr-xr-x 5 root root 4096 Jun 16 23:39 .
drwxr-xr-x 7 root root 4096 Jun 16 23:39 ..
d????????? ? ?   ?       ?            ? bucket
```

The other error message I've seen is:

```
touch: cannot touch ‘/mnt/bucket/test.txt’: Transport endpoint is not connected
```

This happened when I specified the role incorrectly (it does not need to be the full arn).

