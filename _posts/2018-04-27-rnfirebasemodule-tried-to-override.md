---
published: true
layout: post
title: "Native module RNFirebaseModule tried to override RNFirebaseModule for module name RNFirebase"
author: vertis
feature_image:
  url: /assets/img/markus-spiske-qjnAnF0jIGk-unsplash.jpg
  caption: <span>Photo by <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Markus Spiske</a> on <a href="https://unsplash.com/s/photos/programming?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

React Native has been a non-stop whirlwind of obscure error messages. For example:

{% highlight java %}
{% raw %}
Fatal Exception: java.lang.IllegalStateException: Native module RNFirebaseModule tried to override RNFirebaseModule for module name RNFirebase. If this was your intention, set canOverrideExistingModule=true
at com.facebook.react.NativeModuleRegistryBuilder.addNativeModule(NativeModuleRegistryBuilder.java:121)
at com.facebook.react.NativeModuleRegistryBuilder.processPackage(NativeModuleRegistryBuilder.java:109)
at com.facebook.react.ReactInstanceManager.processPackage(ReactInstanceManager.java:1050)
at com.facebook.react.ReactInstanceManager.processPackages(ReactInstanceManager.java:1021)
at com.facebook.react.ReactInstanceManager.createReactContext(ReactInstanceManager.java:959)
at com.facebook.react.ReactInstanceManager.access$600(ReactInstanceManager.java:109)
       at com.facebook.react.ReactInstanceManager$4.run(ReactInstanceManager.java:802)
at java.lang.Thread.run(Thread.java:818)
{% endraw %}
{% endhighlight %}

This one was caused by inadvertantly including the module twice in `android/app/src/main/java/com/example/MainApplication.java`.

I had included `RNFirebasePackage()` twice:

{% highlight java %}
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    new RNFirebasePackage(),
    new VectorIconsPackage(),
    new AndroidWifiPackage(),
    new RNFirebasePackage(),
    new RNFirebaseAuthPackage()
  );
}
{% endhighlight %}

HT to [the github issue](https://github.com/rebeccahughes/react-native-device-info/issues/243) that helped me work out the problem.
