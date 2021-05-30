# Lucca's personal website 

(...a.k.a. _The Lucca Logs_)

This is the source code for my personal website.

## Static site generator

My website is powered by a custom-made static website generator that I built from scratch. 

Currently, my generator is using:
* Backend: [Node.js](https://nodejs.dev/) + [Express.js](https://www.npmjs.com/package/express)
* Markdown parser: [marked.js](https://marked.js.org/)
* YAML parser: [JS-YAML](https://www.npmjs.com/package/js-yaml)


## Creating Posts

New posts are created by simply creating a new Markdown (.md) file in the `/public/posts/` directory and populating with: 
* a YAML front matter (read: _metadata_) header, in a similar manner to [Jekyll](https://jekyllrb.com/) or [Hugo](https://gohugo.io/), with the post's title, templates (optional), groups (optional) and publishing date:

```yaml
---
title: Welcome to my webpage!
templates: []
groups: [all, website]
date: 2021-05-27 10:30:00
--- 
```

* and then some regular Markdown content:
```markdown
Hi, I'm Lucca and this is my personal webpage.

Here you'll find lots of programming, music, electronics and life shenanigans.

Check the sidebar to the left for essays, posts, project write-ups, interesting/relevant links and more.

Wanna see how this website was built? [Check out the GitHub repo.](https://github.com/ChromeUniverse/personal-website)
```

And something like this will be generated in real-time, as soon as the request to the page is made:

![image](https://media.discordapp.net/attachments/760252264723644426/848589820125249566/unknown.png)

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


## Usage (Ubuntu Linux)

* Clone this repo, `cd` into it

* 