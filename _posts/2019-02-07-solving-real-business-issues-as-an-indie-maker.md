---
published: true
layout: post
title: "Solving real business issues as an indie maker"
author: vertis
minutes_read: 10
post_date: Feb 7, 2019 at 2:44pm
feature_image:
  url: https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/03d82851-b6bf-4699-672d-e6755ab28c00/w=800
  caption: <a href="https://dtourstatic.com/?t=f52c6c7a-12be-4148-8947-a47779966cf8">Graphql360 Example</a>
---

As indie makers, analyzing the products that we’re making is a critical part of our product development process. There are many data points that can help us understand whether we’re building the right product, both internal tools and external feedback.

One of the things that I love the most about the Indie Maker community is that we are starting to do this in the open. In that spirit, I want to share my own journey (so far).

For the last 4 to 5 months, I’ve been working a product called GraphQL360. I think it’s a little bit unique in that it’s not a mass consumer app. It’s quite different than what I see others in the community working on.

I believe that [GraphQL360](https://graphql360.com/) perfectly illustrates how makers can have a real impact on larger industries. In this article, I will explain some of the problems with 360° tours as they stand currently and how I hope GraphQL360 can help solve them, crafted by an indie maker.

### Introduction to GraphQL360

GraphQL360 is a product primarily designed for the Real Estate industry. Before I left to become an indie maker and digital nomad in September 2018, I had spent the last 8 years working at realestate.com.au. Realestate.com.au is one of the biggest property portals in the world, somewhat comparable to zillow.com in the US and rightmove.co.uk in the UK.

For the last four and half years I had been working in ‘REALABS’, realestate.com.au’s emerging technology team. Among other things, we released apps for VR headsets and for Virtual Assistants like the Amazon Echo.

Even after leaving the company my head is still very much in this space. It’s a huge global industry, and presents a number of opportunities to revolutionize the way we look at real estate. From the outside, buying and selling a house is the biggest most complex transaction that we’re likely to make in our lives, and the architecture behind the platform is no different.

Despite what it might seem like at times the real estate industry has been embracing new technologies to make the interactions smoother and more efficient since the mid-1990s. Indie makers like myself have got into this exciting industry on the ground floor, and are already making a significant impact on the landscape of the market.

### What are Virtual Tours and why are they important?

Since 2015 virtual tours have increasingly become a part of the buying and selling process for properties. Virtual Tours at their most basic level are a collection of 360° panoramas connected together so one can move around between different spots. Essentially, virtual tours allow people to view all angles of a property online, so they can evaluate a property before visiting it in-person.

They’ve become more common for a number of reasons. The capture technology has become cheaper and more accessible in the last 5 years. Web technologies, such as WebGL have become much more common and easy to access. Without these advances, it’s only behemoths like Google that could hope to release products like StreetView. Now it’s very much within the reach of Indie Makers.

In addition to this, there are a number of driving factors in the Real Estate transaction (and indeed in a lot of other transactions). Trust, Transparency and Time are lenses that we can overlay to look at the Real Estate interactions. For many of these interactions, these elements are not solved problems.

Real estate portals are a great tool, but when we look at photos and floor-plans it is still an effort to try to visualize what the house actually looks like. This is without worrying that they’ve used a fish-eye lens to make the rooms look bigger, or altered the images to make the property more aesthetically pleasing.

So we waste our ***time*** driving out to visit the property. Each time we get a result where it doesn’t match we ***trust*** the real estate agents just a little less.

My approach to solving needs to be different as an Indie Maker, Virtual tours help to solve these problems, by unlocking a deeper understanding of the property, but I can’t hope to reach every real estate agent directly. What I can do is make virtual tours easier for makers, property photographers, and virtual tour providers.

It’s my belief that virtual tours are a fundamental building block for the future of the property buying/renting experience. Which makes them very important to get right.

### Problems with Virtual Tours

With this in mind, it’s not really a surprise that virtual tours are starting to be a big part of looking for a new property. At the moment this is mostly properties that are for sale. Primarily this is supplied with products like [Matterport](https://matterport.com/). I should know, I was heavily involved in spearheading its integration into [realestate.com.au](https://realestate.com.au/).

Matterport is a fantastic product, by far the superior solution if you’re looking to visualize a space. The problem with Matterport is that it’s quite expensive to produce. The cameras are quite costly to purchase, but more importantly, each tour takes between 30 mins and 4 hours depending on the size of the property.

![Professional House Photo](https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/55121cb0-7fa5-4008-db6d-369799ba0900/w=800)

In properties that are for sale, this amount of time is a valuable investment, however rental properties have a much tighter margin.

This has spurred the growth of [many](https://www.immoviewer.com/) [virtual](http://virtualtourscreator.com.au/) [tour](http://vizor.io/) [providers](https://www.augmentspace.com/) that do not offer the same depth and complexity. Typically they rely on consumer 360° cameras such as the [Ricoh Theta](https://theta360.com/) or [Gear360](https://www.samsung.com/global/galaxy/gear-360/).

There is a vast difference between [Matterport](https://matterport.com/) and something put together with the help of 360° cameras like the [Ricoh Theta](https://theta360.com/) or Gear360. For the property seeker, however, any of the solutions is a step up from what basic photos provide.

The quality of their offerings varies widely, as does their UX. Some have top-notch UX, and some have little more than a wish and a prayer. When looking at integrating them into a portal such as [realestate.com.au](https://realestate.com.au/), the sheer number of them poses a problem. Each portal has a responsibility to ensure that there is a good user experience for their users, however, the integration is an iframe or WebView (in the case of mobile apps).

Having externally rendered content makes this task very hard. It puts a burden on the portal to check and approve each of the virtual tour providers, and ensure that over time they don’t regress and break. It also makes it very hard for the tour provider to do everything right. Fixing a bug for one portal may cause problems for another portal.

Differing experiences for the users are confusing. Because of the sheer number of tour providers, there is a lack of consistency between each of the different experiences. The work of indie makers such as myself pushes the industry towards more viable methods, but there is still a lot of work to do. How you click and move around, what additional features are provided, each makes for an uneven experience.

### Content for Virtual Reality

Leaving those problems to the side for a minute, let’s look at another problem. The VR industry has been growing over the last 4–5 years. Depending on which perspective you look at it from, VR is in desperate need of “VR native” content, or conversely, there is a need to be ready for this new medium by producing VR native content.

My awareness of the problem really started as I worked on creating a VR application for realestate.com.au (creatively called [Realestate VR](https://play.google.com/store/apps/details?id=com.rea.realabs.realestate_vr&hl=en_US)). Early iterations of this, in 2015, used what we had access to; photos, videos, and property listing content.

During user testing, we were shocked to discover they hated the solution. In no uncertain terms, we were told that all we’d done is deny them the ability to sit on the couch and watch TV while they looked at property listings on their phones.

This set me to searching for better solutions and building a pool of [Matterport](https://matterport.com/) content. In late 2016 we released the first version of [Realestate VR](https://play.google.com/store/apps/details?id=com.rea.realabs.realestate_vr&hl=en_US). It was a grand accomplishment, and I’m very proud of what the team built.

![Realestate VR](https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/c2eb994c-a9e9-4dc5-3533-0767ab824600/w=800)

Sadly though, it’s still limited. Primarily, by the fact that only 4–5% of listings have a [Matterport](https://matterport.com/) tour. In my opinion, this is due to the prohibitive cost of producing this content.

My time working on these products taught me some valuable lessons that I have carried with me into the indie maker community. Big companies don’t necessarily have an advantage in new fields, they can throw money at the problem, but if they don’t have the correct assets/content, then they don’t have an advantage.

Indie makers have a considerable advantage in keeping things lean. Being able to try things rapidly without permission or business cases. Even if the big company is amazing (and there are plenty of examples of this), they lack the ownership of a problem that an indie maker has. You never work quite as hard for a paycheck as you do when the problem is all yours.

### My take on the problem

My approach to solving this as an indie maker is about providing value. It’s not about competing with the existing players, that would just be a good way to get squashed. It’s about finding ways to collaborate with others and make everyone better off. Big goals and value rather than seeking big profit above all else.

Making virtual tours ubiquitous is a pretty big goal and a problem to be solved, however, the introduction of new technology has helped indie makers be able to contribute to this exciting new industry. To do that requires addressing some of the UX problems with the plethora of virtual tour providers, and in a way that still gives them control over their content (otherwise they’ll never come along for the ride).

At a deeper level, we’re trying to help solve some of the problems and inefficiencies in real estate transactions.

If we are to solve these problems we’re going to need a better pipeline of content and better control over the capture and rendering of content.

### The Path Forward

My indie product, GraphQL360 attempts to solve these problems by becoming the glue in the middle. It allows people to build a virtual tour by defining relationships between the Panoramas (Locations) and storing them for future use. This means that we can start to decouple the virtual tour experience. Tour providers and indie makers can build tours in the abstract. Anyone that wants to display the tour, can control the user experience.

It’s a long way from being what it needs to be. For a start, it requires a lot of buy-in from both virtual tour providers and also the Real Estate portals.

The upside is that it will hopefully help to make it easier to produce virtual tours, and consequently make it possible to actually have a Virtual Reality experience where I can search for my next property without having to track across town on a Saturday morning.

Even if the Virtual Reality offering is still a way off, I’m a believer that we can have a future property search experience where people don’t have to track across town to look at properties (at least until the final stages of searching).

I am excited to see how indie makers can help change the way we look at real estate, an industry normally controlled by highly-paid professionals. The maker community has been an invaluable resource in me understanding product development, marketing, and have provided a source of inspiration for me as I embark on my journey to make a difference by building GraphQL360.

If you want to learn more about virtual reality, or real estate, don’t hesitate to contact me by email!