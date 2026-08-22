---
title: Renaming a Rails 3 app
date: '2012-01-15'
---
Annoyingly Rails 3 spreads whatever name you give it when running 'rails new' over 10 or so files. This makes it hard to setup a base app. The following
shell commands will change the name of the app to the new name:
<!--more-->
<strike>```console
find . -type f -print0 | xargs -0 perl -pi -e 's/Oldapp/Newapp/g'
find . -type f -print0 | xargs -0 perl -pi -e 's/oldapp/newapp/g'
```

I'm a little ashamed that the snippet uses perl instead of ruby. When I was trying to get the equivalent to work in ruby 1.9 it keep complaining about encoding.

For anyone that is interested the ruby version I was attempting to use was:

```console  
find . -type f -print0 |
  xargs -0 ruby -pi -e '$_.gsub(/Oldapp/, "Newapp")'
```

Which gets an error:
```console
-e:1:in `gsub': invalid byte sequence in UTF-8 (ArgumentError)
	from -e:1:in `<main>'
```

Even trying to force an encoding didn't seem to solve the problem.

```console  
find . -type f -print0 |
  xargs -0 ruby -pi -e '$_.force_encoding("UTF-8").gsub(/Oldapp/, "Newapp")'
```

It is likely this wouldn't occur if used from Ruby 1.8</strike>

Update:

While it's nice to have a one liner that will accomplish the renaming. I've seen the above one liner corrupt the .git/index

I've written a simple ruby script that is more limited in how it selects the files:

<script src="https://gist.github.com/1672812.js"></script>
