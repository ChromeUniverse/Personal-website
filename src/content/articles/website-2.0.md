---
title: The Lucca Logs 2.0 - Vue and Improved!
slug: website-2.0
description: |
  The full project write-up and development log of my personal blog's second major release, powered by Vue.js
tags: [programming, frontend, vue, web design, meta]
img-preview: |  
  /images/vue-redesign.png
date: 2022-02-01 19:07:00
public: true
---

As the 2021 holiday season came and went, I finally mustered up some courage and started learning my first frontend framework, [Vue.js](https://www.youtube.com/watch?v=nhBVL41-_Cw), nearly a year after I built my first HTML webpage. 

So, to put my new frontend skills to practice, I decided to completely redesign my blog over the last two weeks using Vue. Yes, the same blog you're reading this article on right now.

![img](/images/vue-redesign.png)

> **Table of Contents**
> - [Shifting gears](#shifting-gears)
> - [Why Vue?](#why-vue)
>   - [Why bother learning Vue?](#why-bother-learning-vue)
>   - [My favorite Vue learning resources](#my-favorite-vue-learning-resources)
> - [Revised architecture](#revised-architecture)
>   - [New content compiler, improved navigation](#new-content-compiler-improved-navigation)
>   - [Switching to NGINX](#switching-to-nginx)
> - [Debugging and solving problems](#debugging-and-solving-problems)
>   - [Handling internal links with Vue Router](#handling-internal-links-with-vue-router)
>   - [Minor issues with Prism snippets](#minor-issues-with-prism-snippets)
>   - [Vue app deployments done right](#vue-app-deployments-done-right)
> - [Conclusion](#conclusion)

## Shifting gears

Firstly, I'd like to address how my vision and goals for this website have evolved over the last couple of months. When I first started this blog, [I made it abundantly clear](/making-the-website#my-vision) that I wanted a purely static website with as little bloat as possible. In particular, this meant **using JavaScript only when absolutely necessary**. Well, that's been thrown out the window, and here's why.

When it comes to designing websites, necessity is obviously a very subjective matter, which is especially true when you're building a personal webpage. Since I'm not developing enterprise-grade SaaS apps for Fortune 500 companies (yet!), I can change literally anything on this blog whenever I feel like it - and being able to tinker around with your personal website is an incredibly valuable asset when it comes to improving your skills as a web programmer. 

As such, my blog now has a new purpose: to act as my own personal coding playground throughout my journey as a web developer. From now on, whenever I learn a new framework or library (JS or otherwise), this blog will now be the first target I'll use to test my new skills. In fact, expect another one of these posts soon after I [learn the basics of Tailwind CSS](https://youtu.be/pfaSUYaSgRo) to implement some ✨ fancier styles ✨ for this blog. 

Apart from that, my blog will still remain as content-centric and distraction-free as it has ever been. The tech that powers this blog serves only to enhance the content. Additionally:
- Reader activity will never be tracked with cookies or analytics.
- You'll never encounter any ads or annoying banners.
- You'll never be required to create an account or pay up to access content on this blog, ever.


---
## Why Vue?

For me, learning a dedicated frontend framework at this point in time just felt like the next logical step in my progression as a web developer. I've gotten to a point in my coding journey where I can confidently build a full-stack web app with a nice Node + Express + MySQL backend but just vanilla HTML/CSS/JS on the frontend. I felt like I needed to focus more on developing my frontend skills, so I chose to learn a framework like Vue.

As far as why I ultimately decided to move my blog to Vue, despite losing the [benefits of a purely static website](https://byteofdev.com/posts/static-site-generators/#performance), well, [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application) aren't all that bad - in fact, navigating between web pages in SPAs feels incredibly snappy and responsive, which I felt was a decent compromise with the website's added weight from JavaScript bundles.

### Why bother learning Vue?

If you're considering learning a frontend framework, a noticeable advantage that Vue has is its gentle learning curve. You can build your first Vue app by importing it from a CDN, then move on to the more complex Webpack-based CLI with [Single File Components](https://v3.vuejs.org/guide/single-file-component.html) (the `.vue` files) and [IDE Tooling](https://github.com/vuejs/vetur), then add a [Router](https://next.router.vuejs.org/), [Vuex](https://next.vuex.vuejs.org/) state management, SSG with [Vuepress](https://v2.vuepress.vuejs.org/), advanced SSR with [Nuxt.js](https://v3.nuxtjs.org/), etc. The Vue learning experience is very incremental, and that helps beginner web developers like myself tremendously. 

Once you get the hang of it, Vue is remarkably simple and enjoyable to use, while offering several features that a vanilla HTML/CSS/JS frontend doesn't have. If you're still on the fence about whether to learn Vue or not, I'd say go for it. If you ever decide to switch to React later, the basics of modern frontend dev will still apply, so you'll be able to learn much faster. Just be sure to learn **Vue 3** instead of Vue 2.

### My favorite Vue learning resources

By far, the best Vue tutorial for beginners I've seen so far is Brad Traversy's [Vue 3 Crash Course](https://www.youtube.com/watch?v=qZXt1Aom3Cs) over at the [Traversy Media YouTube channel](https://www.youtube.com/c/TraversyMedia). He teaches the basics of Vue 3 development by building a neat Task Tracker app with a dummy JSON backend server. You'll learn things like how to use the Vue CLI, how to write reusable UI components with `.vue` files, app lifecycle hooks, data reactivity in Vue, how to configure the Vue Router, and so much more. Highly recommended tutorial.

Other than that, I also suggest reading through the [official guide](https://v3.vuejs.org/guide/introduction.html) from the Vue docs page. No better way to learn Vue than reading the official docs written by the maintainers of Vue!

---
## Revised architecture

### New content compiler, improved navigation

Even though 90% of writing the content for this blog is just editing trusty ol' Markdown files, I've devised a new Node.js-based program for compiling all of the blog's content. It reads the aforementioned `.md` files, extracts their metadata from a [YAML frontmatter](https://jekyllrb.com/docs/front-matter/), converts the files' content into raw HTML, and writes it all to a single JSON file which is bundled as part of the Vue app's JavaScript. This JSON also contains a list of article URL routes sorted by date and group, used for group preview pages ([`/groups/all`](/groups/all), for instance).

This makes it very easy to display the appropriate pages based on which route the user is visiting, since all Vue is doing is reading a JSON file and injecting pre-built HTML into the site's DOM. Most importantly, this makes navigating between different pages on the blog totally seamless! In fact, try clicking on any internal links you encounter to visit different pages, just so you can see what I mean. The best place to try this out is [this blog's homepage](/).

The obvious drawback of this method is the fact that the reader will be essentially receiving a copy of the blog's entire content catalog, most of which they won't be reading anyways, as soon as the Vue app loads its JS bundle. This increases load times and wastes quite a bit of server network bandwidth.

### Switching to NGINX

If you're building your app with [Vue CLI](https://cli.vuejs.org/), running `npm run build` will build your app with a JS bundler and output purely static files into the `/dist` folder: HTML, CSS, JS, images, what-have-you. Also, since all routing in a Vue App is handled client-side with Vue Router, there's no need to set up a fancy backend with Node.js - all you need to do is deploy your files to any machine that can run a web server like NGINX.

Please note that if you are using Vue Router, you'll need to do some extra configuration on NGINX so your app will function properly. For more on this, please check [this section](#vue-app-deployments-done-right) right up ahead.

---
## Debugging and solving problems

Naturally, whenever you do heavy refactoring, there's bound to be bugs everywhere. Here's a list of the most annoying ones I've faced while working on this redesign and how I solved them.

### Handling internal links with Vue Router

When rendering dynamic HTML with the `v-html` directive in Vue, you'll notice that internal links won't automatically switch to `<router-link>` tags, but rather stay as boring ol' `<a>` anchor tags. This means that whenever a user navigates around your website by clicking on internal hyperlinks, your page will do a full reload. If that wasn't bad enough behavior for an SPA, the fact that Vue apps are incredibly heavy due to their JS bundle size is just rubbing salt into the wound, making reload times even longer.

The solution, [originally proposed by Dennis Reimann](https://dennisreimann.de/articles/delegating-html-links-to-vue-router.html), is to implement an app-wide event listener that fires whenever a hyperlink is clicked, ignoring links to external resources, and delegating internal links to Vue Router. This event listener can be bound to the top-level app component's `mounted()` lifecycle hook. My version of Mr. Reimann's code also implements a handler for hash links, a.k.a. "header anchors", which are especially important for blogs.

```js
mounted () {
  
  window.addEventListener('click', event => {

    // ensure we use the link, in case the click has been received by a subelement
    let { target } = event      
    while (target && target.tagName !== 'A') target = target.parentNode
    
    // handle only links that do not reference external resources
    if (target && target.matches("a:not([href*='://'])") && target.href && !target.href.includes('mailto')) {

      // some sanity checks taken from vue-router:
      // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
      const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event
      
      // don't handle with control keys
      if (metaKey || altKey || ctrlKey || shiftKey) return
      
      // don't handle when preventDefault called
      if (defaultPrevented) return
      
      // don't handle right clicks
      if (button !== undefined && button !== 0) return
      
      // don't handle if `target="_blank"`
      if (target && target.getAttribute) {
        const linkTarget = target.getAttribute('target')
        if (/\b_blank\b/i.test(linkTarget)) return
      }
      
      // don't handle same page links/anchors
      const url = new URL(target.href);
      let to = url.pathname;

      // handling header anchors
      if (target.href.includes('#')){

        const slash_index = target.href.indexOf('/', 7);
        const path = target.href.substring(slash_index);

        const [ postpath, headeranchor ] = path.split('#');

        if (postpath == '/') to = `${window.location.pathname}#${headeranchor}`;            
        else to = `${postpath}#${headeranchor}`;
        
      }

      // router navigation
      if (window.location.pathname !== to && event.preventDefault) {
        event.preventDefault()
        this.$router.push(to)
      }
    }
  })
}
```


### Minor issues with Prism snippets

After trying to import the main `Prism.js` script from both CDNs and my local development server, I noticed that my code snippets were broken for no apparent reason. Some trial-and-error debugging ensued, and in the end, I found this extremely hacky workaround which properly displayed my code snippets once again:

```js
// Highlight code snippets with Prism
setTimeout(function() {
  Prism.highlightAll();      
}, 5);
```

Surprisingly, the main `Prism` object was actually available from the browser's console soon after Vue's top-most app component finished loading, but for whatever reason couldn't be accessed through the `mounted()` callback. The solution was to literally just wait a couple of milliseconds after the page fully loaded and then call the main highlighting method from `Prism`.

### Vue app deployments done right

As mentioned previously, if you're using Vue Router in your app and deploying it to a web server, you'll need to take some extra steps to ensure that your app's routes work as intended in a production setting. [Vue's official deployment guide](https://cli.vuejs.org/guide/deployment.html) shows this **very important warning**:

> #### [#](https://cli.vuejs.org/guide/deployment.html#routing-with-history-pushstate) Routing with `history.pushState` 
> If you are using Vue Router in history mode, a simple static file server will fail. For example, if you used Vue Router with a route for `/todos/42`, the dev server has been configured to respond to `localhost:3000/todos/42` properly, but a simple static server serving a production build will respond with a 404 instead.  
> 
> To fix that, you will need to configure your production server to fallback to `index.html` for any requests that do not match a static file. The Vue Router docs provides [configuration instructions for common server setups](https://router.vuejs.org/guide/essentials/history-mode.html).

Following that link bring us to the docs page for Vue Router's [HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html). Scrolling just a bit down reveals this important tidbit:

> When using history mode, the URL will look "normal," e.g. `http://oursite.com/user/id`. Beautiful!
> 
> Here comes a problem, though: Since our app is a single page client side app, without a proper server configuration, the users will get a 404 error if they access `http://oursite.com/user/id` directly in their browser. Now that's ugly.
> 
> Not to worry: To fix the issue, all you need to do is add a simple catch-all fallback route to your server. If the URL doesn't match any static assets, it should serve the same `index.html` page that your app lives in. Beautiful, again!

First things first: If you've haven't done this already, be sure to add a **catch-all fallback route** and enable in your Vue Router config, as well as some hash link and `savedPosition` [scrolling behavior](https://next.router.vuejs.org/guide/advanced/scroll-behavior.html) for good measure:

```js
// @/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Post from '../views/Post.vue'
import Group from '../views/Group.vue'

const routes = [
  {
    path: '',
    name: 'Index',
    component: Post
  },
  // ...
  { 
    path: '/:catchAll(.*)', 
    name: 'NotFound',
    component: Post,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash };
    }
    return { top: 0 };    
  }
})

export default router;

```

If you keep scrolling down the same HTML5 History Mode page from before, you'll find some additional example configuration options for several popular web servers, [including NGINX](https://router.vuejs.org/guide/essentials/history-mode.html#nginx), though you'll only find an example `location` block. A full NGINX config might look something like this:

```nginx
# /etc/nginx/site-available/default
server {
  # port to listen for incoming requests
  listen 80;

  # path to your app's static files
  root /var/www/html/website-vue-dist;  

  index index.html index.htm index.nginx-debian.html;
  
  # useful if you own a domain
  #server_name _;

  # fallsback to index.html if request doesn't match any static files
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

The idea here is that any inbound requests to the server that don't match any static files will fallback to `index.html`, avoiding the behavior described in the warning above.

---
## Conclusion

Learning Vue over the last month or so has been one hell of a ride, and I'm pretty glad I chose to migrate my blog over to Vue. It might not be the best solution long-term, but I'd say the end product turned out to be quite nice, at least for now. Over the next couple of months, I also plan on learning React, so we'll have to see if this blog will be due for another redesign soon.

I'm also working on migrating [_Tank Battle_](/building-tank-battle)'s frontend to Vue.js, and so far it's going surprisingly well. At first I had some trouble dealing with [CORS errors](https://www.youtube.com/watch?v=4KHiSt0oLJ0&ab_channel=Fireship) and figuring out how to implement [JWT auth](https://www.youtube.com/watch?v=7Q17ubqLfaM), but those issues were quickly sorted out. Most of the UI components are already done as well! All that's left to do is add some ✨ fancy styles. ✨ I also plan on doing a complete revamp of the game's art, graphics, and animations, along with bringing some performance improvements, doing some backend refactoring, and adding new gameplay features. Expect a post on _Tank Battle_ 2.0 soon!

That's all for now. I hope you enjoyed reading this article and learned a thing or two as well. Stay tuned for more web design and frontend posts soon as I keep working on my Vue and CSS skills.

Cheers! ✌