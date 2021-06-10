---
title: Implementing responsive design on my website - Part 1
templates: []
groups: [all, programming, webdesign]
date: 2021-06-07 21:29:00
---

_Disclaimer: I'm a noob web designer. Take any advice from this post with a grain of salt._

Yesterday, I finally started working on adding responsive elements to my website. This is a quick post I wrote to document the changes and improvements I've made over the last 24 hours. I plan on writing more of these posts as I make my website more "responsive".

## A primer on responsive design

For the uninitiated, _responsive web design_ (or RWD) is a method of designing webpages in such a way that makes them look nice on any device, no matter their display resolution, screen aspect ratio, or device orientation (i.e. landscape or portrait). Basically, this means making both desktop and mobile users haooy when they visit your website. Responsive webpages should present all the necessary information to all users while also (hopefully) looking aesthetically pleasing on all platforms.

RWD generally involves using (only) clever HTML and CSS, but it can be [quite challenging at times](https://en.wikipedia.org/wiki/Responsive_web_design#Challenges,_and_other_approaches). "Good" RWD can can involve some sort of server-side CSS generation, CSS preprocessors such as [Sass](https://sass-lang.com/), frontend JavaScript frameworks like [React](https://reactjs.org/) or [Angular](https://angular.io/), and tons of other stuff. 

Fortunately for me, since my website is relatively minimal and only has a couple of essential features, I won't have to bother with any of that bloatware.

## RWD on my website 

For starters, this is how my usually website looks like when viewed on desktop:

![image](https://media.discordapp.net/attachments/760252264723644426/851620019962904626/unknown.png?width=1245&height=632)

The previous styles I was using made the website look pretty bad on mobile devices: 

![image](https://media.discordapp.net/attachments/760252264723644426/851632903195590706/unknown.png?width=474&height=631)

Group posts could look particularly horrendous, with extremely narrow posts and clumped up text:

![image](https://media.discordapp.net/attachments/760252264723644426/851634605797933156/unknown.png?width=369&height=631)

After adding a couple of changes, it actually doesn't look quite so bad now:

![image](https://media.discordapp.net/attachments/760252264723644426/851633779331301396/unknown.png?width=347&height=632)

I've also added a handy dropdown navbar with links to easily sort posts by groups (read: _tags_) such as "all", "music", "programming", etc.

![image](https://media.discordapp.net/attachments/760252264723644426/851635581394092042/unknown.png?width=368&height=631)