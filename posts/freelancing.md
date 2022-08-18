---
title: "Working as a freelance developer" 
templates: []
description: |
  description
groups: [drafts]
date: 2022-08-17 23:41:00
--- 

This is a very different article from the ones I've published on this blog up to now. This isn't an article about tech *per se* - rather, it's about transforming tech expertise into a marketable (and profitable!) skill through freelance development work.

For those of you who haven't heard yet, back in February I started working as a part-time Discord bot developer (more on that later). I worked and built tons of bots for about 4 months before having to call it quits and focus on other life priorities. This article pretty much sums up my experience so far working a freelance developer.

> **Table of Contents**
> - [Who's this article for?](#whos-this-article-for)
> - [Becoming a *real* software developer](#becoming-a-real-software-developer)
>   - ["Right, what exactly are you building?"](#right-what-exactly-are-you-building)
>   - ["How much did you make?"](#how-much-did-you-make)
> - [Why freelance?](#why-freelance)
> - [Clientele](#clientele)
>   - [MiniMetamon](#minimetamon)
>   - [AlphaDogs](#alphadogs)
>   - [Happy Heads](#happy-heads)
>   - [Osume](#osume)
>   - [Other](#other)
> - [New skills I've learned](#new-skills-ive-learned)
>   - [Discord API](#discord-api)
>   - [Quickly and reliably deploying Node.js apps](#quickly-and-reliably-deploying-nodejs-apps)
>   - [SSL certificates and HTTPS](#ssl-certificates-and-https)
>   - [JavaScript skills!](#javascript-skills)
> - [Some life lessons I've learned](#some-life-lessons-ive-learned)
>   - ["Do I have what it takes to be successful?"](#do-i-have-what-it-takes-to-be-successful)
>   - [What the heck does "being successful" mean anyway?](#what-the-heck-does-being-successful-mean-anyway)
>   - [Admin work advice (or lack there of)](#admin-work-advice-or-lack-there-of)
> - [Conclusion](#conclusion)

---
## Who's this article for?

My main goal with this article is to document and showcase my (somewhat limited, but still relevant) experience as an entry-level freelance software developer to whoever might be interested.

As with nearly all other articles in this blog, the content here is mostly about my personal life experiences, but I hope that someone out there might learn a thing or two from my story. Here are the groups of people who I think would benefit the most by reading this article, in descending order of perceived relevance:

- **Aspiring developers** (think high school and college students, so mostly teens and young adults) looking to earn some not-so-quick cash doing basic software development
- **Entry-level software engineers** looking to get some real-world experience before entering the industry
- People who are considering going the freelance route or are just starting out with freelance work
- People who might occasionally stalk me on the internet and want to know what I've been up to (you're welcome, creeps)


## Becoming a *real* software developer

I can now proudly call myself an actual **software developer**: someone who's capable of building (and mot importantly, shipping!) software products that meets the needs of clients and users.

This is quite honestly a *huge* accomplishment for me - just over 18 months ago I was starting out with JavaScript and here I am today, building tools that actual people are using right now, and I'm getting *paid* for it - **It feels awesome!** 😆

### "Right, what exactly are you building?"

Believe it or not, **Discord bots**. Yeah, let's talk about that for a minute.

Now, there's an argument to be made that Discord bot developers aren't *real* developers - after all, when the top entries on [top.gg's ranking of most popular Discord bots](http://top.gg) are mostly games about [collecting waifus](https://top.gg/bot/432610292342587392), [anime](https://top.gg/bot/646937666251915264), [Pokémon](https://top.gg/bot/716390085896962058) and [dank memes](https://top.gg/bot/270904126974590976), I'm willing to bet most people would rarely think of Discord bots as *real* software.

Just because there's people who spend an ungodly amount of time messing around with Mudae (looking at you, Wilson), that doesn't mean that all Discord bots are useless or aren't technologically advanced. Take a look at [MEE6](https://mee6.xyz/), for instance: it handles over 19 million servers (!) and has customizable commands, moderation features, livestream alerts (i.e. serious third-party API integrations!), leveling systems, music playback and much more. MEE6's developers clearly know what they're doing.

Discord bots aren't revolutionary, cutting-edge, *blazingly fast™* tech of the future. They're server-side programs written with the sole purpose of enhancing Discord guilds (i.e. "servers"), and that's it. But they still very much behave like real-world backend infrastucture and are perfectly capable of persisting arbitrary user info, querying databases, fetching data from APIs on the internet... and doing basically anything that a web server does! And when done right, Discord bots most certainly have the potential to become exceptional software.

Rant aside, I'll get into more detail about the actual bot I've built in a future article, so stay tuned. 😉

### "How much did you make?"

Honestly, I don't feel comfortable sharing that sort of information at the time being, but I might publish a video about that on [my YouTube channel](https://www.youtube.com/c/LuccasLab) soon! So keep an eye out for that.


---
## Why freelance?

Personally, I decided to set up my own freelance business specifically in the Discord bot space for a couple of reasons:
- I wanted take the JavaScript expertise I've garnered over the began 18-ish months before I started working and really put them to the test in a relatively low-pressure environment while also improving my skills
- I already had some reasonable experience building Discord bots - after all, I'm the creator of [RedstoneBot](/redstone), a fairly complex and modestly popular bot written in Python
- I wanted to start building a strong portfolio as a developer by including projects that came from real, honest-to-goodness paying customers
- I was looking for a new source of disposable income to invest in my hobbies: audio and/or video production equipment, my tech desk setup, new music gear, hardware to learn/practice electrical engineering, maybe go on a trip to Europe or the United States, or literally anything else.

---
## Clientele

Here's a list of the main groups and organizations who hired my development services throughout my four-month stint. 

Like I said before, I'll also be publishing a follow-up to this article soon where I go into more detail about the bots that I've built for each of these organizations.

### MiniMetamon

[MiniMetamon](minimetamon.com) is an NFT project where you collect and trade Metamon on your quest to complete the MetaDex - sounds awfully familiar to an insanely popular, genre-defining game from the 90's, sure, but quite honestly, they're one of the more interesting projects I've seen in the crypto space so far. 

They're developing art assets for 151 unique Metamon in several different formats (2D, 3D, pixel art, static and animated) for their upcoming DApp, which should also allow you to mint, collect, evolve, and trade your Metamon.

I actually met MMM's founder [Nick Rains](https://www.linkedin.com/in/nicholasrains/) through Fiverr and was eventually hired as MMM's lead Discord bot dev. In total, we developed 5 unique bots, mostly focused on general utilities within the [MiniMetamon Discord server](https://discord.gg/6BCweWWTjV):

* **Multi-purpose Ethereum + Discord integration**, featuring: 
  * ETH wallet linking and identity verification, similar to [Collab.Land](https://collab.land/)
  * ERC1155 NFT ownership verification and real-time updates
  * Whitelist management tool with [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) generator 
  * Dynamic server perks for MiniMetamon backers and holders (special roles, etc.)
* **Invite tracker**: unique invite link generation, invite tracking, and points system
* **Collaboration request** form with Discord modals and emailing system
* **Support ticket** system
* **Discord infrastructure** system for guiding newcomers through onboarding videos and customizing roles and server notification settings

### AlphaDogs

[AlphaDogs](https://alphadogsnft.io/) is another NFT project, this time based on collecting pixel art "Alpha" dogs and staking them for rewards, apparently. To be honest, I'm not sure what their shtick is... but you can check their [Twitter](https://twitter.com/AlphaDogsNFT), their [whitepaper](https://discord.gg/dm8MR47n9S) and the (owner-only) [Discord server](https://discord.gg/dm8MR47n9S) for more info, I guess.

I also met Alpha Dogs' founder and CEO Denisson Pissai (who's also Brazilian!) through Fiverr and was originally hired to develop a bot as an MVP for their upcoming [Valhalla Warriors](https://twitter.com/ValhallaWarNFT) P2E game. Eventually the bot was taken down due to lack of interest. I also maintained, audited and hosted a Python-based Twitter engagement metrics bot.

### Happy Heads

Here's yet another NFT project, but this time, instead of pixel art puppies or metaverse Pokémon, you're collecting silly big-headed cartoon characters called "Happy Heads".

The project has been in hiatus since late May - the project's founder (dubbed *FallenTomato*) said that they "want to take this time to revamp the server and ensure that the project has a future in this bear market". All activity on their (private, invite-only) Discord server has basically grinded to a halt at this point and there's no telling if or when they will come back.

Anyways, I was approached in March by an irish fellow called Druss, who at the time was one of the community managers for Happy Heads, who was interested in adding a suite of casino-style games and an economy system to drive up engagement and server activity. Once we finished those, we later added a system for trading your casino profits into raffle tickets for giveaways (would you look at that, gambling inception). Fun times! 🤪


### Osume

Finally, not another random NFT project! [osume](https://www.osumekeys.com/) is a small keycap manufacturing and design company based in Canada, and their keycaps are simply beautiful! I'd definitely buy one of their keycap sets if I had a mechanical keyboard. [Their Discord](https://discord.gg/uBEzSDd6bz) is also by far the most welcoming and chill server I've joined so far. 

Joyce, one of osume's art designers, approached me about extending [Nadeko Bot](https://nadeko.bot/)'s economy system, by adding a slew of new games and features, like hourly coin earnings, a fake stock market betting game (seriously!). The hard part was doing all of this while interfacing with osume's self-hosted instance of Nadeko, which meant performing some basic queries on an existing SQLite 3 database.


### Other

The following is a list of smaller organizations I've worked with.

- **Talion Homework Services**
  - Developed a highly customized supprt ticket bot that links tutors and students and manages payments and earnings 
- **Alien Chicken NFT**
  - Made a simple number guessing game and a role assigning bot
- **AktieMaskinen Trading**
  - Built a simple embed message forwarding bot

---
## New skills I've learned


### Discord API

Naturally, you need to learn the ins and outs of Discord's API if you want to build bots that can actually do cool stuff. This includes learning what the API can and can't do too, and personally I've run into some situations where you have to design your own workarounds to overcome Discord's limitations to complete a task. 

<!-- Here's an example: if your bot is in a guild with, say, some 5k+ members, and you need to fetch all users with a specific role, don't fetch  -->

### Quickly and reliably deploying Node.js apps

Since I almost entirely using Node.js to develop my bots, this was also a nice opportunity to practice deploying Node.js aps quickly. In practice, this means:
- Installing Node.js and NPM with [nvm](https://github.com/nvm-sh/nvm) instead of using packages managers like apt
- Using `.gitignore` to exclude local environment variables (`.env`) and configuration files (`config.json`) from version control
- Using JSON files as databases (yeah, I'm not joking, say what you want, I don't give a damn) and fixing any issues with data persistence in production should they arise
- Using [PM2](https://pm2.keymetrics.io/) to run Node-based Discord bots and using it to monitor/log the bot's activity (this helped a lot with debugging issues in production)

### SSL certificates and HTTPS

When building MiniMetamon's multi-purpose Ethereum + Discord integration bot, one of our biggest challenges we faced was finding a way to allow users to link their MetaMask wallets to the bot. This required our frontend team to build a website with [Next.js](https://nextjs.org/) and use [Ethers.js](https://www.npmjs.com/package/ethers) so that users could sign a faux transaction and verify their identity, as well as read their public wallet address and send it to the bot, and this meant that I had to integrate a basic API backend into the bot as well. 

Now, up to that point, I hadn't yet had the chance to properly practice deploying an [Express](https://www.npmjs.com/package/express) + [NGINX](https://www.nginx.com/) webserver to a production environment, but that was the mission nonetheless, and I managed to pull it off! Kudos to Brad from [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA) for [his awesome tutorial on how to deploy Node.js apps](https://www.youtube.com/watch?v=oykl1Ih9pMg) along with setting up SSL with [Let's Encrypt](https://letsencrypt.org/) and [Certbot](https://certbot.eff.org/), I couldn't have done it without him.

### JavaScript skills!

Of course, I also managed to get lots of practice writing JavaScript as well. This was a great oportunity to practice writing code with modern ES6 features, such as using arrow functions, destructuring, template literals (personally I like to call these "string interpolation"), and the new Array and String methods.

---
## Some life lessons I've learned

Working and running your own business is 

### "Do I have what it takes to be successful?"

The age-old question of "am I actually good enough to do X" usually stems from self-doubt rather than someone else actually questioning your abilities, especially when you're starting out - unless, of course, you're  actually convincing clients you've got what it takes to get the job done, but you're not even going to get to that point if you don't believe in yourself to begin with.

Now, being confident in your skills is important. But there's no point in dreaming of working as a freelance full-stack web developer extraordinaire when you can't even build a basic portfolio page. Keeping your expectations in check with your real-world skills is not only a good way to avoid frustrations down the line but can also help you define which services you're better fit to sell.

### What the heck does "being successful" mean anyway?

Starting your own indie business is **not** like taking tests at school or winning a medal in a Math Olympiad. In fact, it's anything but:
- There's no "A+ grade" - there are no straightforward metrics to compare your current performance to an "ideal" level (not even revenue statistics!)
- Most of the time you also won't be able to directly compare yourself to your competition
- Heck, you might not even be sure who your competition is in the first place! 
- Most importantly, **you literaly cannot cheat**!

The point is, when it comes to running your own business, success is a very vague idea by itself. It could mean earning 7 figure yearly profits, but it could also just mean having more time to spend with family or to enjoy your hobbies. In any case, unless you really depend on freelance work as your main source of income, here's my advice: 
- **Don't strees out too much** about things not working out.
- Make peace with the fact that **not everything is under your control**, but things that are might be an opportunity for improvement and growth.
- **Be patient** and opportunities will come your way.
- Focus your energy on **growing your business**: build a nice portfolio, invest in some marketing, provide top-notch customer support, and most importantly, *build awesome products*.

### Admin work advice (or lack there of)

Unfortunately, I don't have much advice in terms of how to do administrative tasks (scheduling meeetings, contracts, finances, bookkeeping, taxes, etc.) as I just wasn't earning enough to justify worrying about that sort of stuff. Sorry! 

In any case, at the bare minimum you **must** create and regularly update a Google Sheet with all your business finances. For revenue, add a new line for every project your completed with a short description of what you delivered, who paid you, how much your earned, how long that project took and when you started/finished it. Do the same for expenses, and make sure to specify what exactly it is you paid for as well as a qualitative measurement of how essential that expense is to your business.

---
## Conclusion