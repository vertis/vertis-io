---
layout: post
title: "Daily Stand Up #1"
---

I've made a commitment with myself that I'm going to write blog posts regardless of whether I feel like it or not. I'm going to start by writing the same kind of content that comes up at "Stand Ups" every morning.

For a start my day is currently sliced into working on taking sliced HTML and working it into the Rails app, that our team in currently working on, as themes. It's giving me an opportunity to exercise my, somewhat rusted, CSS/HTML/JS skills.

I've also been spending some time with my operations/admin hat on. Working through the process of making sure that the actual ops team delivers what we need to launch the product. It's all pretty run-of-the-mill stuff, a more interesting problem is the reliability of using the legacy SQL Server database over a long period of time.

We've been seeing errors like 'ActiveRecord::StatementInvalid: ODBC::Error: 08S01 (20020) [unixODBC][FreeTDS][SQL Server]Bad token from the server: Datastream processing out of sync' and 'ActiveRecord::StatementInvalid: ODBC::Error: S1008 (0) [unixODBC][FreeTDS][SQL Server]Operation was cancelled'

Testing so far has led us to believe that it has something to do with old/invalid connections not being dropped and replaced with new connections. This may or may not have to do with the fact that the connection the SQL Server is done directly on the model(s) rather than through ActiveRecord::Base...which is in turn because we're storing everything that we can in a MySQL database.

We've started working with an already customised version of the activerecord-sqlserver-adapter to improve the way that it handles these errors - by including the error messages in the array of messages that result in a reconnect. Whether this turns out to be an effective solution or not remains to be seen.

