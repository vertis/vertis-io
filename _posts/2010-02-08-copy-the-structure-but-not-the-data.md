---
published: true
layout: post
title: "Copy the structure but not the data."
minutes_read: 2
post_date: Feb 8th, 2010 11:28:08pm
permalink: /post/379338929/copy-the-structure-but-not-the-data
tags:
  - documentum
  - sql
  - oracle
  - high_volume_server 
  - offline_load 
  - elegant 
---

I’m working on a prototype at the moment that requires me to insert data into offline tables (offline as far as Documentum is concerned). The examples that I’ve found all resort to specifying the exact structure of the table.

create table DMI_OBJECT_TYPEx (

R_OBJECT_ID VARCHAR2(16) NOT NULL,

I_TYPE NUMBER(10,0) NOT NULL,

I_PARTITION NUMBER(10,0) NULL);

The example above is smaller than most of the tables I have to create. The weakness with this is that you have to look up the table structure. The writers probably chose this method because the much simpler syntax shown below also brings any data that is in the table.

CREATE TABLE DMI_OBJECT_TYPEx AS SELECT * FROM DMI_OBJECT_TYPE;

My initial thought was why not copy the table and then just truncate it, but after a bit of searching I stumbled upon the solution. Essentially adding a WHERE clause to the end of the query that never evaluates to TRUE enables us to take the structure without the data.

CREATE TABLE DMI_OBJECT_TYPEx AS SELECT * FROM DMI_OBJECT_TYPE WHERE 1=2;
