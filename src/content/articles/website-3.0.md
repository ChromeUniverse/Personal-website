---
title: "Revamping my website with Astro"
slug: website-3.0
description: |
  A project write-up on my website's third major release.
tags: [programming, frontend, astro, web design, meta]
img-preview: |
  /images/website-3.0-astro.png
date: 2023-03-09 18:48:00
public: true
---

Welp, it's that time again of year again when I decide my website needs a total makeover.

This update was a long time coming, actually -- the [last time](/blog/website-2.0) I made one of these meta-posts, I had just migrated my blog to Vue.js, but I already knew it had some serious performance and maintainability issues. Among other things, these were:

- A large JavaScript bundle that was very, **very** slow to load.
- A design that didn't look that great.
- The fact that the site was entirely client-side rendered.
- A Webpack config that kept breaking for no fricking reason!! 🤬
- A lack of a domain name (I just linked people to the webserver's IP address...)

With this update, I wanted to address all of those problems and even add some more other cool things, such as a portfolio to showcase my personal and/or freelance projects and a neat lil' contact form. This way I could transform my makeshift Vue blog into a full website.

And that's exactly what I did! Introducing **blaring.net** -- my very own corner of the World Wide Web, where I can show off my skills and projects, talk about coding and life through this blog, and even market my freelance web development business. Not bad, eh?

---

## Migrating to Astro

My original plan was to just switch out Vue for React, but then I realized that wouldn't help with shrinking the JS bundle or improving load times. So I looked around for static site generators (SSGs) on [Jamstack.com](https://jamstack.com/) -- [Next.js](https://nextjs.org/) and [Gatsby](https://www.gatsbyjs.com/) were among the most popular, but Next's bundles were way too heavy, and having to learn GraphQL for Gatsby was a hard pass. Over the past year though, I've been watching [Theo](https://www.twitch.tv/theo) on Twitch and one framework came up every so often in his rants: [Astro](https://astro.build/).

**Astro** is a framework for building multi-page applications (MPAs), and it ships 0kB of JS by default, allowing you to just build content-rich websites and only add in interactive bits when you really need to. It can be used as an SSG, it's got tons of [cool plugins](https://docs.astro.build/en/guides/integrations-guide/), and you can even use UI frameworks like React, Vue, Svelte, Solid, etc.

Migrating to Astro was a great move because it solved all of the problems I had with my previous Vue website:

- Tiny JS bundle (4.1kB, including Font Awesome and my own scripts).
- Seamless integration with Tailwind CSS.
- Much faster load times since the site is pre-rendered during the build process.
- Webpack has been replaced by [Vite](https://vitejs.dev/), a much better bundler.

However, one exception would be the portfolio section, which uses React. This means that the full client-side React runtime and components need to be loaded, which results in ~50kB of JS. Thankfully, this is just a small part of the site, and 50kB isn't _that_ bad either -- it's nowhere near the 100kB+ Next.js bundles.

---

## Design inspiration

I'm just gonna go ahead and say it: I'm a really crappy designer. Hand me a Figma file and I'll turn it into a decent website, but I have a hard time coming up with good designs on my own. But I had to do something about my old blog: it looked very inconsistent, the orange-on-violet palette wasn't too appealing, and vanilla CSS styles just aren't that maintainable.

Thankfully, Astro has an [official Tailwind CSS integration](https://docs.astro.build/en/guides/integrations-guide/tailwind/), which is a great first step for building a nice design system, but that's all it really is, a starting point -- I still needed some actual design inspo.

So I turned to two of my favorite tech bloggers' websites for some inspiration: [Tania Rascia](https://www.taniarascia.com/) and [Lee Robinson](https://leerob.io/). Go check them out if haven't already!

![](https://www.taniarascia.com/static/c2115d332bab6f58e7d626a7bbde4016/00d43/v51.png)

![](/images/old-leerob-io.png)

Their websites felt very intuitive to use and navigate through. They look *really* cool too: they have a minimalist vibe that's also very sleek and professional. I blatantly stole a few ideas from each one, like LeeRob's hero banner, Tania's "latest articles" section, and probably many more that I can't consciously pick up on. I really hope they don't mind... 😅

### Styling with Tailwind CSS

Aside from some not-so-original ideas, the rest of the redesign was pretty much done all by myself. I tried to stick to Tailwind's defaults for colors, spacing, typography, etc. as much as possible to avoid spending too much time worrying about small things and just focus on building a decent-looking website. 

One really cool feature of Tailwind that I only recently found out about is the official [typography plugin](https://tailwindcss.com/docs/typography-plugin) -- It's basically a "fire-and-forget" solution for styling markup you have no control over, such as HTML rendered from Markdown files. If you're building a Markdown blog with Astro and Tailwind, I **highly recommend** adding this plugin to your Tailwind config, and I'm surprised the Astro docs [only briefly mention](https://docs.astro.build/en/guides/styling/#markdown-styling) it!

Ultimately, I'd say using Tailwind worked out quite well for this site. I'm pretty glad with the end result, especially considering my not-so-great design skills.

---

## New features

### Portfolio

This was the most important feature I wanted to add to my new site. Before working on this update, the only way I had to showcase my projects was through my GitHub repositories or the occasional project write-up I posted on my blog every now and then.

I went with a pretty simple design for my portfolio section: a 2-column Grid layout with a card for each project with a simple preview image and a title. Hovering over a card displays a brief description of the project as well as a link to the full project page. This page lists the technologies I've used and goes into more detail about how the project was built. It also has a cool screenshot gallery!

### Blog

Astro makes building blogs super easy by offering great support for Markdown and MDX, which is great because it means I get to keep all of my old Markdown posts! 

I set up a dynamic route for blog posts, `/blog/[slug]`, which just fetches all of my Markdown files, extracts the YAML frontmatter and converts the content into HTML as an Astro component. I'm using `getStaticPaths()` to generate a list of all paths to pre-render during the build step, as well as pass in metadata and markup as page-level props. 

Easy peasy!

### Contact form

I also wanted to add a contact form for business inquiries, but setting up a Node.js backend to receive submissions and forward them to my email felt like too much work just to get a simple form working.

Enter [Netlify Forms](https://www.netlify.com/products/forms/), one of their most underrated features imho. You just build your regular HTML form as usual, add a `netlify` attribute, and you've got a full form submissions panel on your site's Netlify dashboard, with email notifications to boot. How cool is that?!

Netlify's Forms service was super simple to set up, and you can even add reCAPTCHA for additional verification. It works so well, I immediately switched this site's deployment from Vercel to Netlify and never looked back. Kudos to [Alana](https://alanacapcreates.com/) for letting me know about this!

Pro tip: Tailwind CSS also has an [official plugin for forms](https://github.com/tailwindlabs/tailwindcss-forms)! I'm using it on this site right now and it works really well.


---

## Deploying to Netlify

Once everything was ready to go, I created a new project on Netlify to deploy the site. I don't have much to say about the process -- it all was very smooth, setting up the Forms service was easy, and preview deployments for pull requests and branches work well too. Just an awesome experience overall, really!

The coolest part about using Netlify is that I can now get rid of my old [hodgepodge GitHub Actions script](/blog/gh-actions-website/) for deploying the site to my AWS server. I guess GH Actions is better suited for full-blown CI/CD pipelines rather than deploying static sites.

---

## Next steps?

With the recent migration to a dedicated SSG, I'd say this website has become a lot more optimized than its previous iterations. But I can think of a few things to make it even better.

### Preact

[Preact](https://preactjs.com/) is an alternative to React that has roughly the same API in a tiny 3kB package. This would be a nice way to reduce the portfolio section's JS bundle size, improving load times and responsiveness without having to completely rewrite my existing React components.

### Design improvements

There's always room for improvement when it comes to design, especially for a newbie like myself. I've really enjoyed reading [Refactoring UI](https://www.refactoringui.com/) lately -- it's a nice UX design book by the creators of Tailwind CSS, and it's already helped me level up my design skills considerably.

---

## Conclusion

This website has come a really long way since its [first release](/blog/website-1.0) back in mid-2021. But this newest update is far from being the last -- I'm always playing around and experimenting with new technologies, and I'm sure I'll find an even cooler static site framework sometime soon.

But until then, I'll just focus on writing about my full-stack web dev journey and making some improvements to the site's design over the next few months.

Thanks for reading! Peace ✌