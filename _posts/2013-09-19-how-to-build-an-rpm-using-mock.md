---
published: true
layout: post
title: "How to build an RPM using Mock"
author: vertis
---

Building an RPM can be a somewhat annoying, painful experience. There are plenty of pitfalls, but the most annoying, for me at least, is building a package and then trying to install it and realising that it doesn't work because of some incompatibility in the packages that just happened to be on your build box.
<!--more-->
One solution to this problem is to use [Mock](http://fedoraproject.org/wiki/Projects/Mock "The Mock Project"). Mock does a great job of building up an standalone environment, so that you can 'Fail early', if you haven't written your spec file correctly.

Start by installing [Mock](http://fedoraproject.org/wiki/Projects/Mock "The Mock Project") and other required packages. For example:

{% highlight bash %}
$ sudo yum install mock autoconf automake bison bzip2 createrepo \
                   gcc gcc-c++ iconv-devel libcurl-devel libffi-devel \
                   libtool libxml2 libxml2-devel libxslt libxslt-devel \
                   libyaml-devel make openssl-devel patch readline \
                   readline-devel rpm-build zlib zlib-devel rpmdevtools
{% endhighlight %}

Mock won't allow users other than root by default. This is easily fixed by adding your build user to the mock group:

{% highlight bash %}
$ sudo usermod -G mock bamboo
{% endhighlight %}

From there I usually create an `rpmify` script. This example comes from packaging a rails application:

{% highlight bash %}
#!/usr/bin/env bash
set -x

# Remove previous results in case of build environment not being clean
rm -rf result

echo $BUILD_NUMBER > /tmp/build_number

bundle package

export PACKAGE_NAME=example-rails
rm -rf /tmp/${PACKAGE_NAME}
mkdir -p /tmp/${PACKAGE_NAME}
cp -rf ./* /tmp/${PACKAGE_NAME}/
mkdir -p ~/rpmbuild/SOURCES
tar zcvf ~/rpmbuild/SOURCES/${PACKAGE_NAME}.tar.gz -C /tmp/ ${PACKAGE_NAME}

rpmbuild -bs ${PACKAGE_NAME}.spec

export MOCK_CONFIG=epel-6-x86_64
export MOCK_CONFIG_ROOT=/var/lib/mock/$MOCK_CONFIG-$PACKAGE_NAME-$BUILD_NUMBER

/usr/bin/mock -r $MOCK_CONFIG --uniqueext=$PACKAGE_NAME-$BUILD_NUMBER --init
/usr/bin/mock -r $MOCK_CONFIG --uniqueext=$PACKAGE_NAME-$BUILD_NUMBER --copyin /tmp/build_number /tmp/build_number

/usr/bin/mock -r $MOCK_CONFIG --uniqueext=$PACKAGE_NAME-$BUILD_NUMBER --installdeps ~/rpmbuild/SRPMS/${PACKAGE_NAME}-${BUILD_NUMBER}-1.el6.src.rpm
/usr/bin/mock -r $MOCK_CONFIG  --uniqueext=$PACKAGE_NAME-$BUILD_NUMBER --no-clean ~/rpmbuild/SRPMS/${PACKAGE_NAME}-${BUILD_NUMBER}-1.el6.src.rpm

# Artifacts
rm -rf result
mkdir -p result
cp $MOCK_CONFIG_ROOT/result/*.log result/

if [[ -f $MOCK_CONFIG_ROOT/result/${PACKAGE_NAME}-$BUILD_NUMBER-1.el6.x86_64.rpm ]]; then
  cp $MOCK_CONFIG_ROOT/result/${PACKAGE_NAME}-$BUILD_NUMBER-1.el6.x86_64.rpm  result/
  cp $MOCK_CONFIG_ROOT/result/${PACKAGE_NAME}-$BUILD_NUMBER-1.el6.src.rpm result/
  exitstatus=0
else
  exitstatus=128
fi
/usr/bin/mock -r $MOCK_CONFIG --uniqueext=$PACKAGE_NAME-$BUILD_NUMBER --clean
exit $exitstatus
{% endhighlight %}

The script is designed to be used within bamboo, so it does some handling around the artifacts that it produces

Mock looks in /etc/mock for the config that you specify, in this case `/etc/mock/epel-6-x86_64.cfg`. It is from here that it finds information on how to deploy the dependecies. If you have custom repositories, you'll want to create your own file.

And voila, your very own professionally built RPM.
