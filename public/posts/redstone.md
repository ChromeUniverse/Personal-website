---
title: "RedstoneBot"
templates: []
description: |
    The official page of RedstoneBot, a Discord bot for managing Minecraft servers hosted by PloudOS.
groups: [redstone-posts, projects]
date: 2021-07-17 20:15:00
--- 

## DEPRECATION NOTICE

### RedstoneBot will be shut down, permanently, no later than August 14, 2021.

All RedstoneBot-related development activities have been ceased and this repo will soon be archived.

Documentation for RedstoneBot (including technical docs, guides, etc.) will still be available for the foresseable future.

**For more information, please read[ this post](http://34.200.98.64/redstone-shutdown).**

Thank you for using RedstoneBot!

---


Hello, and welcome to the official webpage of RedstoneBot! 

**Want to use RedstoneBot in your Discord server? Read the Quickstart Guide [here!](/redstone-quickstart)**

**Want to see what RedstoneBot is capable of? Take a look at the [Features page](/redstone-features)!**

**Want to contribute to the development of RedstoneBot? [Open a Pull Request or a new issue!](https://github.com/ChromeUniverse/RedstoneBot)**

---

## Not So Frequentely Asked Questions

### What the heck is PloudOS?

It's a free Minecraft server hosting service with a questionable business model.

It's great! It was created by a German guy called Erik Groh. [Check it out!](https://ploudos.com/)

### What exactly is RedstoneBot? What does it do?

RedstoneBot is a Discord bot for interacting with Minecraft servers hosted by PloudOS, and was originally built for the SMP BR Discord, a small Minecraft Survival Multiplayer community based in Brasília, Brazil.

In short, RedstoneBot lets you do all (well, mostly) the same things that you would (normally) do on your server's management page at PloudOS.com, but from the comfort and coziness of your favorite Discord server. How cool is that?

### How did you make this bot?

At the heart of RedstoneBot is Python 3 and the discord.py API wrapper for Discord.

Here are some of the modules I used. Some of them already come pre-installed with Python.

**AsyncIO** - Used to write concurrent (i.e. "asynchronously executed") code/frameworks

**AIOHTTP** - Asynchronous HTTP requests, built on top of AsyncIO

**JSON** - Decodes and encodes JSON objects

**CSV** - Read/write operations for Comma Separated Value (CSV) files

**Beautiful Soup** - HTML Parsing and web scraping

I spent a fair amount of time experimenting with some other modules, too, but these ones sacrificed a lot of performance for simplicity. If RedstoneBot has any chance of scaling up, it can't (and shouldn't) rely on these modules for dealing with multiple Discord servers and dozens of API calls per second.

**Selenium webdriver for Python** - Web browser automation; a cool way to automate boring web-based tasks, but really, really, really slow. It can't handle dynamic web pages well. From my experince, Selenium is still super finicky and very hit or miss.

**Requests**, a.k.a. "HTTP for humans" -  a really awesome library for foolproof HTTP requests/responses, and it comes with lots of neat tools, like custom headers, cookies, persistent sessions, and more. Unfortunately, it doesn't have support for AsyncIO, which can make web apps take a performance hit, especially when you're dealing with things such as API calls.

RedstoneBot is currently hosted on an AWS Lightsail instance running Ubuntu 20.04.

For more technical details, check out the repo linked above the N.S.F.A.Q.'s.

### Why did you spend your time making this?

Because I like challenges and I code to learn.

First and foremost, building RedstoneBot was a programming adventure. I knew basically nothing about web scraping techniques before starting this journey. But I've learned things which I would never have learned if it weren't for this project: AsyncIO and asynchronous programming, event loops, how to properly read technical software documentation, HTTP requests and responses, decoding/encoding JSON data, creating and interacting with simple CSV databases, and tons more. All of these new skills will most certainly help me with more complex software projects in the future.

But, of course, building a cool bot to impress your Discord buddies isn't too shabby, either. 😉

### What's the next step in the development of RedstoneBot?

Next step...? It's done. I need to get a life now.

I'll make some commits to the GitHub repo here and there, but they'll be few and far between.