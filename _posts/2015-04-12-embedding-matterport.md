---
published: true
layout: post
title: "Embedding Matterport"
author: vertis
minutes_read: 2
feature_image:
  url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/2a7ba85e-fbf4-4ec5-05d3-7dad520e6a00/w=800
  caption: Early screenshot of a Matterport "dollhouse"
---

I have been working on getting [Matterport](https://matterport.com) integrated into the [realestate.com.au](https://realestate.com.au) listings. The teams responsible for those pages have a roadmap that extends for months. This is not an unusual problem within a big company.

The best way of testing is to put the [Matterport](https://matterport.com) tour into the photo carousel. Unfortunately, that's difficult due to it's design. It was not designed to accomodate the things that we now want it to do.

I came up with a solution, in what I hope is true [Lean Startup](https://theleanstartup.com) style. Insert a small javascript embed that loads a clickable banner like the one below. This will sit below the photo carousel

![3D Placeholder](https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/2027c562-ef94-42f8-ab96-7a1d4759ed00/w=800)

When the users click on the banner they visit to a page that loads the correct [Matterport](https://matterport.com) tour for the listing. I deployed a small webapp using [Heroku](https://heroku.com) that allows us to see analytics about the way they interact.

Compared to the effort of doing the photo carousel, this was a quick and dirty way to test integrating. It's difficult to embody the Lean Startup in a big organisation, but this is, I hope, one example of Build -> Measure -> Learn.