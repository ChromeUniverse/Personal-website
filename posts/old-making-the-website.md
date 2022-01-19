---
title: _DEPRECATED_ - How I made my personal website
templates: []
groups: []
description: 
date: 2021-06-15 10:59:00
---

This is a little guide for those who might be interested in knowing how this website was made and the rationale behind of the decisions that I made while building this website

The full source code for my website is available [here](https://github.com/ChromeUniverse/Personal-website).

## Introduction

To be perfectly honest, I don't have any experience at all when it comes to building websites. I've never tried services like Squarespace or Wix or Wordpress, and I've yet to try using a static website generator like Jekyll or Hugo, but I've heard that these tools/services can yield some pretty interesting results.

In fact, a good friend of mine who's also a programmer uses Hugo on [his personal website](https://bykoga.com/) and it ended up looking quite spiffy!

But instead of diving straight into learning how to to use some sort of website making tool, I wanted to build something myself that I had almost complete control over and that abstracted the least amount of code away from me. In other words, I wanted to build my website from near scratch. 

I have some experience building some basic full-stack web applications with Node.js, but no experience so far with frontend libraries like React, Angular or Vue. Naturally I chose Node as my backend and wrote all the front-end stuff in plain HTML, CSS and JavaScript.

## My vision 

Content-wise, I wanted a reasonably simple website for displaying a couple of blog-style posts in which I could talk about anything to my heart's content: music, coding, science, technology, you name it.

I wanted to build a system that made it ease for me to write new posts without having to mess around with complicated databases and third-party libraries (both for the frontend and backend) had to be kept to a minimum to reduce complexity.

And for whoever might be consuming content on this website, I wanted them to be greeted with something that was minimalist in nature to avoid distractions, but still somewhat aesthetically pleasing. I also wanted to build something that made it easy to browse posts and topics easily and quickly, in the case that the reader wished to do so.

## The solution 

To meet these goals, I came up with the following system.

Unlike static site generators, where the full HTML for the pages is already laid out and ready to be served to the website's client, I chose to use a dynamic site generator, where the server is responsible for building the webpage on-the-fly. It's probably not as efficient as a pure static file server, but it has proven to be working quite well, at least for now.

The Node.js server script would process the incoming request and pass some information to the generator, which would generate and return the appropriate HTML to the server, which  would serve the final webpage to the client.

As far as the actual posts go, I chose to go with Markdown (.md) files which contain both metadata in YAML and actual text written in Markdown. The server-side script splits the file in half and parses the YAML with [JS-YAML](https://www.npmjs.com/package/js-yaml) to extract the metadata and the actual text with [Marked.js](https://marked.js.org/) to convert Markdown into pure HTML, which can be rendered by a web browser.

Markdown makes it super duper easy to write nicely formatted text with headers, section, subsections, links, images, etc. It's mush less cumbersome than raw HTML and writing and formatting text-based content, but since it can't be rendered by a browser, it needs to be converted to HTML somehow first, which is where Marked.js comes in.

## Creating Posts

New posts are created by simply creating a new Markdown (.md) file in a specific directory and populating it with: 
* a YAML front matter (basically a header with some metadata) in a similar manner to [Jekyll](https://jekyllrb.com/) or [Hugo](https://gohugo.io/), with the post's title, templates, groups and publishing date, like so:

  ```yaml
  ---
  title: Welcome to my webpage!
  templates: []
  groups: [all, website]
  date: 2021-05-27 10:30:00
  --- 
  ```

* And then, some regular Markdown content:

  ```markdown
  Hi, I'm Lucca and this is my personal webpage.

  Here you'll find lots of programming, music, electronics and life shenanigans.

  Check the sidebar to the left for essays, posts, project write-ups, interesting/relevant links and more.

  Wanna see how this website was built? [Check out the GitHub repo.](https://github.com/ChromeUniverse/personal-website)
  ```

And something like this will be generated in real-time, as soon as the request to the page is made:

![image](https://media.discordapp.net/attachments/760252264723644426/848589820125249566/unknown.png)

Notice how the title is clearly displayed at the top with a big, readable font and a horizontal line that makes it stand out from the rest of the post. The date in which the post was made and groups in which the post belongs are neatly shown under the horizontal line in unobtrusive italicized text with a gray color.

This system certainly accomplishes the goal of being easy to write posts and modify them if I need to, but I think the true beauty comes from the fact that all the information is neatly stored in a human-readable single file.

## Templates

The generator features a basic templating engine as well.

To include a template, simply specify which template file to include in the `templates` section in the post's front matter. The file must be included in the `/public/templates/` directory _(check example below)_. 

By default, two templates called `base.html` and `base.css` are included with every single page.

There's even a nifty template for fetching GitHub READMEs:

```yaml
---
templates: [github-fetch.md]
groups: [all, github-readme, me]
github-url: https://github.com/ChromeUniverse/Personal-Website 
date: 2021-05-27 14:33:00
---
```

In the above example, the `base.html`, `base.css` and `github-fetch.md` templates are included with the post.

## Groups

Posts can be filered by groups by simply visiting `www.websiteurl.net/group-name`, which will display all posts that belong in the group _group-name_, from newest to oldest.

Groups basically work like tags for your posts.

To assign groups to posts, specify which groups that post should belong to in the `groups` section in the post's front matter.

```yaml
title: My thoughts on Daft Punk's _Random Access Memories_
templates: []
groups: [all, album-review, music, daft-punk]
date: 2021-05-27 12:00:00
``` 

The above example post would show up in the _all_, _album-review_, _music_ and _daft-punk_ groups.

## The all-powerful website generator

Okay so obviously, my website generator is quite limited in what it can do, so it's pretty damn far from "all-powerful", but it's the one doing the heavylifting behind this website. It's not very flexible, but at least it gets the job done, in addition to being  easy to maintain and expand on.

This is basically how the generator works:

* **Templates**: the generator loads some base templates in the form of some HTML and CSS. It includes whatever additional templates are required for a specific page.

* **Metadata**: the generator then loads the metadata for a specific post - these would be things like the title, date, and groups (a sort of tagging system I developed). The information in the metadata would be displayed in the page's header and could also be used by the server to filter posts by groups, sort them by date, etc.

* **Content**: then, the generator gets the post's actual content. Since it's still in plain Markdown, it reads the content, and parses it with Marked.js to get raw HTML.

* **Serve page**: finally, the server bundles it up into a single HTML file to and sends it out to the client as the body of the HTTP response.