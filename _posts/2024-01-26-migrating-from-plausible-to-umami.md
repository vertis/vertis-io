---
published: true
layout: post
title: "Migrating from Plausible to Umami for Web Analytics"
author: vertis
minutes_read: 2
feature_image:
  url: /assets/img/vert1s_illustration_of_a_web_analytics_migration_fcb0a32b-8b78-4ed0-bba1-949016d621df.png
caption: "Midjourney imagines a Web Analytics Migration"
meta_description: "Self hosted web analytics setup"
---

# Migrating from Plausible to Umami for Web Analytics

We've recently shifted from using Plausible to Umami for our web analytics. While Plausible's privacy-first approach was appreciated, its limitations became apparent over time. Key functionalities were removed without our notice, leading to broken analytics - admittedly, a lapse on our part for not staying updated. Additionally, accessing detailed data and exporting was gated behind additional payments, restricting our insights without further investment.

Migrating to Umami, however, proved to be a smooth process. The primary steps involved:

- Find the supported/easy platforms in the [Umami docs](https://umami.is/docs). It has a really rich set of documentation helping you get setup
- Setting Up a Database: We chose Supabase, because they offer a good free postgres, but Umami is flexible with various platforms. The [documentation](https://umami.is/docs/running-on-supabase) is slightly out of date here. Supabase is moving away from pgbouncer to it's own solution called [Supavisor](https://github.com/supabase/supavisor). You'll want to get the correct url for the ["Session Mode" connection pooler](https://supabase.com/docs/guides/database/connecting-to-postgres#how-connection-pooling-works) -- Prisma, and therefore Umami is more difficult to get working with "Transaction Mode" (it's not possible to make schema changes through the later mode).
- Clone and push, don't fork: Instead of forking the Umami GitHub repository, clone the repo and then create a repo from scratch. This approach safeguards our setup against [potential](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/what-happens-to-forks-when-a-repository-is-deleted-or-changes-visibility) [issues](https://www.niels-ole.com/ownership/2018/03/16/github-forks.html) if the original repository gets deleted or changes visibility, plus a myrriad of [other problems](https://web.archive.org/web/20111128074444/http://zbowling.github.com/blog/2011/11/25/github/) with forking.
- Configuring the Vercel Project: With the repository set up, we created a project on Vercel and configured the DATABASE_URL environment variable to connect to our Supabase database.
- Setting up a subdomain in cloudflare
- Finding all the script tags that previously pointed to Plausible and updating them to our new endpoint.

Umami's self-hosted nature gives us greater control and customization over our web analytics, aligning more with our goals for robust and reliable data tracking.