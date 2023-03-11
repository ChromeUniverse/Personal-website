---
title: blaring.net
subtitle: My personal website, blog and portfolio. You're viewing it right now!
slug: blaring-net
main-image: /images/portfolio/blaring-net/home.png
source: https://github.com/ChromeUniverse/Personal-website
article: website-3.0
demo: https://blaring.net
tech: [astro, react, tailwind, ts, netlify]
images: [
  /images/portfolio/blaring-net/home.png,
  # /images/portfolio/blaring-net/skills.png,
  # /images/portfolio/blaring-net/freelancing.png,
  # /images/portfolio/blaring-net/music.png,
  /images/portfolio/blaring-net/portfolio.png,
  /images/portfolio/blaring-net/portfolio-luccachat.png,
  /images/portfolio/blaring-net/blog-home.png,
  /images/portfolio/blaring-net/blog-article.png,
  /images/portfolio/blaring-net/contact.png,
]
---

**blaring.net** is my new personal website, designed and built to supersede my original blog website, [The Lucca Logs](/portfolio/lucca-logs), and be my very own little corner of the World Wide Web. It was made primarily to showcase my portfolio of software development projects and programming skills, as well as host my blog articles.

I chose to use [Astro](https://astro.build/) to build this website, as suggested countless times by [Theo Browne](https://www.youtube.com/@t3dotgg) and the folks from the [T3 community](https://t3.gg/discord). Astro's HTML-first static site generation is nothing short of a godsend, especially when compared to non-prerendered [Vue.js](https://vuejs.org/), which was used to build **The Lucca Logs**. SEO is now much better as well: custom prerendered HTML meta tags allow for better page indexing and awesome social media link previews.

The site's [Portfolio section](/portfolio) was very fun to work on! I used a combination of Astro and [React](https://reactjs.org/) components to add some nice interactivity, like a menu to filter my projects by specific technologies. Hovering over each card shows a brief description of the project, and a link to the full project page. (You're reading it right now!) The project page has a list of badges at the top showcasing the technologies that were used to build each project, important links (such as source code, live demo and/or a full project write-up) as well as an image carousel.

The [Blog section](/blog) is almost a carbon copy of **The Lucca Logs** - in fact, the articles were carried straight over during the Vue to Astro migration without any major alterations. The article pages still display a handy list of links to tag pages, which show a filtered list of public articles that have that specific tag.

Finally, I also added a [nifty contact form](/contact). Setting this up was surprisingly easy thanks to [Netlify's Form service](https://www.netlify.com/products/forms/). In fact, their form service works so freaking well I switched over from [Vercel](https://vercel.com/) in a heartbeat. Sorry, nothing personal! 🤭