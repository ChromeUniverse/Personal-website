---
title: How I built my personal website
templates: []
groups: [all, programming, webdesign]
date: 2021-06-15 10:59:00
---

**_Note: This post is almost done, but it's still a work-in progress!_**

_This is an updated edition of a post I made a couple of weeks ago, which can be viewed [here](/old-making-the-website)._

This is a little guide for those who might be interested in knowing how _The Lucca Logs_ was made and my reasoning behind some of the design choices that I made while building this website.

All files and source code for my website are available [here](https://github.com/ChromeUniverse/Personal-website).


## A brief introduction

To be perfectly honest, I don't have any experience at all when it comes to building websites. I've never tried services like Squarespace, Wix or Wordpress, and I've yet to try using a "real" static website generator like Jekyll or Hugo, but I've heard that these tools/services can yield some pretty nice results. In fact, a good friend of mine who's also a programmer uses Hugo on [his personal website](https://bykoga.com/) and it ended up looking very unique and quite spiffy!

But instead of diving straight into learning how to to use some sort of website making tool, I wanted to try building something that was truly my own. I wanted something that had just the right balance of control and expandability. I wanted to build something that I had almost complete control over and that abstracted the least amount of code from me, but at the same time would give me the flexibility to add libraries and additional third-party features as I saw fit. Or in other words, I basically wanted to build my website (both frontend and backend) from scratch.

I have some experience building basic full-stack web applications with Node.js, but no experience so far with frontend libraries like React, Angular or Vue. Naturally I chose Node as my backend and I decided to write all of the frontend stuff in plain HTML, CSS and JavaScript.

---

## My vision 

Content-wise, I wanted a reasonably simple website for displaying a couple of blog-style posts in which I could talk about anything to my heart's content: music, coding, science, technology, you name it.

I wanted to build a system that made it ease for me to write new posts without having to mess around with complicated databases, preferably by only creating/editing a single plaintext file. Extra libraries (both frontend and backend) had to be kept to a minimum to reduce complexity. Any extra NPM packages or frameworks better have a really good reason to consume my oh-so-precious kilobytes of AWS network transfer.

And for whoever might be consuming content on this website, I wanted them to be greeted with something that was minimalist in nature to avoid distractions, but still somewhat aesthetically pleasing. I also wanted to build something that made it easy to browse posts and topics easily and quickly, in the case that the reader wished to do so.

---

## The solution 

To meet these goals, I came up with the following system.

My website uses a custom-built static site generator ([What's that?](https://www.youtube.com/watch?v=3INXQ_4W42g)) which takes in plaintext files with post content and metadata, adds some CSS templates, and generates all of the HTMLs for the website. It's simple script written in Javascript that runs in Node.js. The files are served by a Node.js + Express static file webserver. All of the static files and the webserver are hosted on a basic AWS Lightsail instance running Ubuntu 20.04, which costs about $4 USD/month to run. I've also set up a CI/CD pipeline with GitHub Actions for automatically building and deploying my website to AWS, which you can read more about [here](http://34.200.98.64:3000/gh-actions-website).

_Note: I'll be often referring to the static site generator as a "compiler", because that's just the name I chose for the script -_ "[`compiler.js`](https://github.com/ChromeUniverse/Personal-website/blob/main/compiler.js)".

Even though Express.js is quite a chonky Node.js library, it's by far the simplest web framework I've ever used. It's ridiculously simple to use, and I love how simple it is to setup Express as a static file server and how easily you can create custom routes. 

_**Unpopular opinion/Digression**: Django's "all batteries included" approach quite honestly **sucks** and is very alienating for beginner web developers, even if you're an intermediate Python programmer with a couple of years of experience under your belt, like myself. You'll quickly find yourself constantly switching between a huge amount of additional (read: unnecessary) files, even if all you want to do is setup a minimal webserver with some basic routes. Flask and Express.js did it **way** better - change my mind._

As far as the actual posts go, I chose to go with Markdown (.md) files which contain both metadata in YAML and actual text content written in Markdown. The compiler script splits the file in half and parses the YAML with [JS-YAML](https://www.npmjs.com/package/js-yaml) to extract the metadata and the actual text with [Marked.js](https://marked.js.org/) to convert Markdown into pure HTML, which can be rendered by a web browser.

Markdown makes it super duper easy to write nicely formatted text with headers, section, subsections, links, images, etc. It's much less cumbersome than raw HTML and writing and formatting text-based content, but since it can't be rendered by a browser, it needs to be converted to HTML somehow first, which is where Marked.js comes in.

---

## Creating posts

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

After running the compiler, something like this will be generated, written to an HTML file and will be ready to served by the Node.js webserver:

![image](https://media.discordapp.net/attachments/760252264723644426/848589820125249566/unknown.png)

Notice how the title is clearly displayed at the top with a big, readable font and a horizontal line that makes it stand out from the rest of the post. The date in which the post was made and groups in which the post belongs are neatly shown under the horizontal line in unobtrusive italicized text with a gray color.

This system certainly accomplishes the goal of making it really easy to write and update posts, but I think the true beauty comes from the fact that all the information is neatly stored in a single human-readable file.

---

## Templates

The generator features a basic templating engine as well.

Templates can be included to a post by specifying the template file in the `templates` list in the post's front matter. The file needs to be located in the `/public/templates/` directory _(check example below)_. 

By default, two templates called `base.html` and `base.css` are included with every single page. Pages for displaying posts in a specific group also include the `group.css` template.

I even made a nifty template for fetching GitHub READMEs! You can see it in action for yourself [here](http://localhost:3000/boxworld). Now I don't have to redo my old project write-ups! 😄

```yaml
---
templates: [github-fetch.md]
groups: [all, github-readme, me]
github-url: https://github.com/ChromeUniverse/Personal-Website 
date: 2021-05-27 14:33:00
---
```

In the example above, the `base.html`, `base.css` and `github-fetch.md` templates will be included with the post.

---

## Groups

"Groups" basically work like tags for the posts.

Posts can be filered by groups by simply visiting `mywebsiteurl.net/group-name`, which will display all posts that belong in the group _group-name_, from newest to oldest.

Groups are assigned to posts by specifying which groups that post should belong to in the `groups` list in the post's front matter.

```yaml
title: My thoughts on Daft Punk's _Random Access Memories_
templates: []
groups: [all, album-review, music, daft-punk]
date: 2021-05-27 12:00:00
``` 

The example post above would show up in the _all_, _album-review_, _music_ and _daft-punk_ groups.


---

## The all-powerful static webpage generator

Okay so obviously, my website generator is quite limited in what it can do, so it's pretty damn far from "all-powerful", but it's the one doing the heavylifting behind this website. It's not very flexible, but at least it gets the job done, in addition to being easy to maintain and expand on. This is how it works:

* **Content**: First, the generator fetches the post's actual content. Since it's still in plain Markdown, it reads the content and parses it with Marked.js to get the raw HTML. 

* **Metadata**: The generator then loads the metadata for a specific post - these would be things like the title, date, and groups (a sort of tagging system I developed). The information in the metadata would be displayed in the page's header and could also be used by the server to filter posts by groups, sort them by date, etc.

* **Templates**: The generator loads and applies some base templates in the form of some HTML and CSS. It includes whatever additional templates are required for a specific page.

* **Write to HTML file**: Finally, the server bundles it up into a single HTML file, which can be served by the Node.js webserver.