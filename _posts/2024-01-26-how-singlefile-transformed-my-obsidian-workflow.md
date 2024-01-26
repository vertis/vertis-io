---
published: true
layout: post
title: "How SingleFile Transformed My Obsidian Workflow"
author: vertis
minutes_read: 2
feature_image:
  url: /assets/img/vert1s_illustration_of_a_personal_knowledge_managemen_fb01bc16-d582-4812-b0ee-b495105bc80d.png
caption: "An illustration of a personal knowledge management system (Midjourney)"
meta_description: "SingleFile"
tags:
  - knowledge_management
  - digital_workflow
  - singlefile
  - firefox_addons
  - obsidian
  - web_archiving
  - opensource
  - productivity_tools

---

A recent interaction with the creator of [SingleFile](https://addons.mozilla.org/en-GB/firefox/addon/single-file/), a Firefox extension I often use, on [Hacker News](https://news.ycombinator.com/item?id=39143231) led me to reflect on its role in my knowledge workflow. It was also a perfect moment to express gratitude for this outstanding [open-source extension](https://github.com/gildas-lormeau/SingleFile).

Before integrating SingleFile, my process involved capturing web content in Markdown, using [MarkDownload](https://addons.mozilla.org/en-GB/firefox/addon/markdownload/) (another awesome extension) and embedding it directly into my [Obsidian](https://obsidian.md/) notes. This approach, while straightforward, resulted in a cluttered knowledge base, as undigested content made searching through my notes increasingly cumbersome.

SingleFile, true to its name, allows for downloading webpages as single files and offers much more. Key features include the ability to upload files to a git repository and an 'Infobar' linking back to the original page.

Snapshotting web content helps maintain access to information even when web pages change or disappear. This approach helps mitigate reliance on the Wayback Machine, which has a sadly incomplete coverage. In the same way that companies create mirrors of open-source packages to protect against their disappearance, I'm creating a mirror of the web content I find valuable.

Each file added to my [permanent-web-snapshots](https://github.com/vertis/permanent-web-snapshots) repository triggers a static site deployment to Vercel. I consciously chose not to store this content directly in my Obsidian repository to avoid the previous issue of cluttering. By maintaining the content externally, I preserve the organized and curated nature of my primary notes while still having easy access to the broader information.

Regularly, I review the content added to this system. I don't feel like I'm qualified to talk about the next stage, but I try to distill the information, extract insights, and weave them into my knowledge system. Linking back to my permanent web version. It's working well so far.

It's still a work in progress, but this workflow represents a significant improvement over my initial Markdown-based method. I'm sure there will be future refinements.

## Aside: Supporting Open Source

Coming across the SingleFile creator was a reminder of how individual contributions profoundly enhance our digital experiences. There are so many contributions like this that help provide the shoulders we stand on. This inspired me to find their donation page, a gesture I've realized I should make more often.
