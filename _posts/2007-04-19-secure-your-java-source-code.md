---
layout: post
title: "Secure Your Java Source Code"
---

<!--       -->

I want to quickly run you through the pitfalls of using java as a programming language when it comes to the security of your proprietary source code. One of the problems with Java is the relative ease with which you can reverse engineer the source code. In fact there are numerous tools out there which will very simply and quickly take your project and turn it into a VERY readable document. For the purpose of instruction we will first decompile the example project, comparing the original source with what comes out the other end.
<!--more-->
We will repeat this process (if possible with the techniques that can be used to protect your source code).
<h2>The Jad Decompiler + Front End Plus</h2>
As mentioned above there are plenty of available decompilers, however JAD is a free and open source alternative that is perhaps the most popular option out there. Coupled with Front End Plus, a GUI that is designed to use JAD, you can very easily open and decompile the Java source.

This is a decompile of my own Arms Conversion program, as you can see, while you may have to do a little work if you wished this code to recompile, the intent of can be seen very clearly.
<h2><em>Obfuscation</em></h2>
Obfuscating the source code is one method that is often used to protect Java code. It refers to deliberately making the code harder to read. Rather than a cracker getting back a function called <em>IDoSomethingCool (String name)</em> ... they instead might get something back like <em>dadaba3 (String adabc9989).</em>

This doesn't stop the cracker from reading the code, nor from it working if they chose to recompile it. However it does make it MUCH more difficult to determine the intent of the code. Are the naming conventions that programmers use to determine what information is being stored/parsed/manipulated

I should be clear that this is far from a full proof solution. With time and dedication it is still possible to rebuild the original intent. However Obfuscation is a big step towards making it a waste of time (it may cost less to just write the application from scratch).

There are plenty of tools available that can be used to obfuscate the code.
<h2>Native Compilation</h2>
By far the best option for protecting the source code is the ability to natively compile the application. While there are potential issues to be addressed in order to implement native compilation it has the benefit of making the reverse engineering infinitely more difficult.

While NO application is truly immune to reverse engineering, going from compiled code back to useable source code requires a very specialized ability, and a depth of knowledge about computer programmers that is possessed by few.

Native code compilation is discussed in more detail in another document, which deals with additional features that are available, and also the potential problems with natively compiling your applications.
