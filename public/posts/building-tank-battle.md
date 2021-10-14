---
title: "Bulding _Tank Battle_, an online multiplayer combat game" 
templates: []
description: |
  The full project write-up and development log for _Tank Battle_.
groups: [all, programming, projects, games, webdesign]
date: 2021-13-07 18:52:00
--- 

<!-- _`> Note: this post is a WIP!`_  -->

<!-- _`> If you've reading this post right now, I'd appreciate your feedback.`_ -->

Back in April 2021, I decided to tinker around with [p5.js](https://p5js.org/) graphics the first time while coding along with Daniel Shiffman's (a.k.a The Coding Train) great [p5.js tutorials](https://www.youtube.com/watch?v=HerCR8bw_GE&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA) on YouTube.

My friends Eduardo and Heitor soon joined in on the fun, and we ended up building a simple game where you controlled a box-like character and moved around around in an open 2D world. This eventually turned into [_The Box World_](https://github.com/ChromeUniverse/The-Box-World), a Club Penguin-like lounge game where you can create rooms, invite your friends, walk around and chat with your buddies by sending messages in the room chat.

Around the same time, I happened to find a pretty neat .io game, [TankRoyale.io](https://tankroyale.io/), and it didn't take me long to realize that I might be able build my own version with the technologies that I already knew. So that's exactly what I did, and thus _**Tank Battle**_ was born!

Over the next couple of months, I would work on the project sporadically, implementing cool features, learning tons of new things, and of course, breaking my code hundreds of times, doing complete project rewrites, and debugging all sorts of unforeseen issues. Nevertheless, I managed to power through it all and finally completed the game in early October of 2021. 

As of writing this, _Tank Battle_ is online and you can check it out [here](http://18.229.196.24:4000/).

<!-- Nevertheless, I managed to once again cross the gruesome valley of coding confusion and emerged victorius with my project finally completed in early October of 2021. As of writing this, _Tank Battle_ is online and you can check it out [here](http://18.229.196.24:4000/). -->



![](https://media.discordapp.net/attachments/760252264723644426/895442475278274580/unknown.png?width=1343&height=665)

<p class="img-caption"> <i>Tank Battle</i> game room with two players </p>

>**Table of contents**
>* [Goals](#goals)   
> * [How I built it](#how-i-built-it)      
> * [New technologies that I learned](#new-technologies-that-i-learned)  
> * [Next steps](#next-steps)   
> * [Conclusion](#conclusion)


---

## Goals

Before I began this long and arduous web/game development journey, my primary goal was just to get a small prototype working to show off to my friends. However, as with literally any software side project ever, [feature creep](https://en.wikipedia.org/wiki/Feature_creep) started to kick in. 

I started thinking to myself: what features and technologies could I add to make this game cooler? The project's scope grew quickly and my goals started expanding. How about a fully fledged database? Maybe even a user authentication system? An API for fetching leaderboard rankings, player stats and user data? Things like that. 

Even without any prior experience in any of those things, eventually I decided that these extra features added useful fucntionality to the "end product", so to speak, and warranted some extra blood, sweat and tears to bring them to life. And so, [filled with detemmienation](https://www.youtube.com/watch?v=i9KKnll-RN0), I added them to my to-do list and started implementing some extra spicy features to the game.

In the end, these were the final goals I decided on:

* Real-time communication over [Websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) with a simple message exchange model
* Graphics with [p5.js](https://p5js.org/)
* Game rooms that anyone can create and join 
* Game matches/rounds with a match state lifecycle:
  * Waiting: waits for a minium number of players to join
  * Pre-match: lasts a couple of seconds before starting the match starts
  * Match running: the actual game itself
  * Post-match: lasts a couple of seconds before after the match ends
* Award points to the players at the end of each match
* An [Elo](https://en.wikipedia.org/wiki/Elo_rating_system)-like rating system and a public leaderboard
* Simple and secure user signup/login system with [JWTs](https://www.youtube.com/watch?v=UBUNrFtufWo) and password [hashing](https://en.wikipedia.org/wiki/Hash_function)/[salting](https://en.wikipedia.org/wiki/Salt_(cryptography))
* A [SQL](https://www.youtube.com/watch?v=zsjvFFKOm3c&t=56s) database with a basic schema for storing user data
* A simple and funtional but aesthetically pleasing UI with only vanilla HTML and CSS
* Frontend written entirely in vanilla JS - no additional libraries expect when absolutely necessary

Fortunately, I was actually able to meet nearly 100% of the goals I had outlined for this project, even the ones that were added to the to-do list during the later stages of development. As a guy who still sees himself as an "advanced beginner" programmer, seeing this project through to the end was incredibly rewarding and satisfying.

!["oh, what, wow, he's the greatest dancer"](https://c.tenor.com/fJh-W38iA3oAAAAC/dance-kid.gif)
<p class="img-caption"> tfw you finish your cool new online game </p>

---

## How I built it

Since _Tank Battle_ is essentially another fullstack web app created by yours truly, you can definitely expect some of the usual suspects to be driving the inner workings of this project. However, there are a couple of very important special guests this time round, without whom this project wouldn't be complete.

### Frontend

As with all my web dev projects so far, I'm using vanilla HTML, CSS and JS on the frontend. No fancy frameworks like React/Vue/Angular here.

![](https://media.discordapp.net/attachments/760252264723644426/895500676749213776/unknown.png?width=739&height=665)

<p class="img-caption"><i>Tank Battle</i> Home Page</p>

The frontend code is also pretty straightforward - most of it is just HTTP requests made with the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and DOM manipulation with vanilla JS.

Other that that, there's only two other special things I'd like to note here. Firstly, (and as I've said before) I'm using [p5.js](https://p5js.org/) for the graphics in the game room page - this includes doing things like drawing the rooms, players, bullets, obstacles and game prompts. Secondly, I'm using the native browser [WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) for exchanging JSON-encoded messages over WebSockets with the main game server. (an alternative to this would be a library like [socket.io](https://socket.io/)).

<!-- If you've never heard of p5.js before, in a lot of ways it's basically [Processing](https://processing.org/) for the web browser - you can use it to draw almost anything on an HTML canvas and even make some fun animations. -->


### Backend

Building the frontend for _Tank Battle_ was a relatively simple task - all I had to do was build a minimal UI with vanilla HTML and CSS and and write some code to perform a couple of HTTP requests. But building a reliable, feature-rich, modular and easily maintainable backend though, that was the real challenge here.

Of course, since I've now become a Certified JavaScript Simp™, I absolutely refuse to use anything other than [Node.js](https://nodejs.org/en/) for my web apps' backend. In this case, I'm running two completely independent Node servers.

One of them acts as the main [webserver](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server), powered by the good ol' [Express.js](http://expressjs.com/) framework. It's responsible for a large part of _Tank Battle_'s core functionality, including:

* Serving static files (mostly client-side scripts, stylesheets and a favicon) with the [Express static file middleware](https://expressjs.com/en/starter/static-files.html)

* Handling API requests for leaderboard rankings and user data using the [Express Router](https://expressjs.com/en/guide/routing.html#express-router)


![](https://media.discordapp.net/attachments/760252264723644426/895442180104126544/unknown.png?width=730&height=665)

<p class="img-caption"> <i>Tank Battle</i> Leaderboard </p>


* Connecting to a MySQL 8.0 database with a connection pool and perform SQL queries using [mysql2](https://www.npmjs.com/package/mysql2)

* Authenticating users with [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken)

* Creating new player accounts and keeping their passwords safe by hashing and salting them with [bcrypt](https://www.npmjs.com/package/bcrypt) before storing them in the MySQL database.

The other Node program is the main game server. It acts as a WebSockets server and also runs all of the game logic. Out of the two Node servers, the main game server is the one doing the heavylifting here, including:

* Handling all of the near real-time bidirectional communication by exchanging messages with clients (i.e. players and spectators) over Websockets using the [ws](https://www.npmjs.com/package/websockets) package.

* Managing the internal states of all game rooms, including room metadata (number of players, current match state, etc.), spectators, players, obstacles, and bullets.

* Running the main game loop, which consists of:

  * Updating the match state for all game rooms according to the match state lifecycle (i.e. switching between "Waiting for players to join", "Pre-match", "Match running", "Post-match" states when appropriate)

  * Receiving user inputs and queueing them up for later processing - this includes player movement, shots, room spectation and room join requests.

  * Running all game physics - this includes player motion, projectile motion and ricochets (i.e. reflecting off walls and obtacle edges), and collision detection between different entities (players, solid obstacles, bullets, room walls)

  * Sending the current game state back to all players and spectators in all rooms


A very important aspect that made the game's backend **waaay** easier to work on is being able to [split your app into multiple files](https://www.youtube.com/watch?v=nt9M-rlbWc8) This might sound trivial, but separating your app logic into discrete, manageable units allows you to plan your system at a higher level first and get into the nitty-gritty coding later, which is essential for larger projects like _Tank Battle_. Using multiple files makes your code easier to maintain and expand on in the future, and it's a lot less distracting.

The backend is hosted on an AWS EC2 instance (a free-tier eligible one, of course!) located in São Paulo, in order to minimize latency. Most of the people who will try out _Tank Battle_ are most likely going to be relatives or close friends of mine who live here in Brazil anyways, so I might as well deploy my app to a nearby host.

If you'd like to self-host your own version of _Tank Battle_, I've got detailed instructions [here](https://github.com/ChromeUniverse/Tank-Battle).

---

## New technologies that I learned

_Tank Battle_ is by far the most complex and demanding software project I've worked on to date. I've learned **a lot** of really cool things during the game's development cycle, and honestly, I would've never thought I would have accomplished all of this.

### Node.js/Express backend

I've been using the Node.js + Express combo for literally 100% of my web projects for the past year and so far it's worked remarkably well. This time round, though, I found that using the [Express Router](https://expressjs.com/en/guide/routing.html#express-router) made a _huge_ difference in making my webserver code more modular and maintainable by splitting all of the route logic into separate files. 

The Router also proved to be very useful for making a simple API. It only has a couple of endpoints, notably, `/lb`, which returns a JSON with the leaderboard data, and `/user`, which returns a JSON with player stats.

I also got to try out some very useful npm packages, like [`bcrypt`]([bcrypt](https://www.npmjs.com/package/bcrypt)) for secure password storage, [`mysql2`](https://www.npmjs.com/package/mysql2) for querying data from a MySQL database, [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) for user authentication, [`validator`](https://www.npmjs.com/package/validator) for validating user emails, [`dotenv`](https://www.npmjs.com/package/dotenv) for environment variables, and more.

### User authentication

Authentication systems for web services are notoriously difficult to implement by yourself in a production setting. If you plan on shipping your code as part of an actual product, you'll most likely have to use an Identity-as-a-Service provider like Google's [Firebase Auth](https://firebase.google.com/docs/auth/), [Auth0](https://auth0.com/), [Okta](https://www.okta.com/), [Cognito](https://auth0.com/) by AWS, etc (take a look at this [great article](https://withblue.ink/2020/04/08/stop-writing-your-own-user-authentication-code.html) by Alessando Segala for more on this). That being said, since _Tank Battle_ isn't a serious product (like, at all), I can totally get away with just using [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) (JWT) and [web cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) for user auth. 

When a user fills out the login form, the browser makes a `POST` request to `/login` with a JSON containing the the user's username and password. Once the webserver receives the request, it checks the database to see if the username/password combination is valid, in which case it will send a JWT inside a cookie back to the user's browser. 

While this approach _might_ be prone to a [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attack, it's simple and quite effective, and any vulnerabilities should be mitigated by using the `HttpOnly`, `SameSite` and `Secure` cookie attributes. 


### Relational Databases with SQL

I took this opportunity to try out the [SQL](https://www.youtube.com/watch?v=zsjvFFKOm3c&t=56s) language and a [relational database](https://en.wikipedia.org/wiki/Relational_database#RDBMS) system for the first time. If you're looking for a quick and easy way to get started with SQL too, I highly suggest following Khan Academy's awesome [Intro to SQL](https://www.khanacademy.org/computing/computer-programming/sql) course. Trust me, you won't regret it.

When it comes to setting up an actual SQL database for your app, though, two common open-source options come to mind: [MySQL](https://en.wikipedia.org/wiki/MySQL) and [SQLite](https://en.wikipedia.org/wiki/SQLite). These are completely different relational database systems: while MySQL is a fully-fledged program (i.e. a database server) that requires a local or remote TCP connection in order to connect to the database and perform SQL queries, a SQLite database is contained entirely inside a single file. For more on MySQL vs. SQlite, take a look at this [comparison](https://www.hostinger.com/tutorials/sqlite-vs-mysql-whats-the-difference/) by Hostinger. 

In the end, I chose MySQL Server 8.0 as it's more commonly used with Node.js than SQLite. As far as Node packages go, I'm using [`mysql2`](https://www.npmjs.com/package/mysql2) to connect to MySQL (don't forget to use [connection pooling](https://github.com/sidorares/node-mysql2/issues/939#issuecomment-932748114)!) and perform queries. You could also use an Object-Relational Mapper (ORM) like [`sequelize`](https://www.npmjs.com/package/sequelize), which works well with lots of different flavors of SQL, including MySQL, SQLite and others.

If you're looking for a tutorial on how to setup MySQL Server on your system, then check out this awesome [article](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) from DigitalOcean or this great [tutorial](https://www.youtube.com/watch?v=Cz3WcZLRaWc) from Fireship on YouTube. 


### Async programming

Being able to write asynchronous code is a necessity for any web application in the 21st century. Present-day JS (both server-side and client-side) already have support for modern `async`/`await` syntax since the introduction of ECMAScript 2017. Many Node frameworks and libraries like Express, `ws`, `mysql2` and `jsonwebtoken` make extensive use of Promises and async functions.


### Client-Server game model

The core of the client-server architecture that's powering _Tank Battle_ is heavily inspired by a series of fantastic articles from [Gabriel Gambetta](https://www.gabrielgambetta.com/), a senior software engineer at Google Zürich, titled [Fast-Paced Multiplayer](https://www.gabrielgambetta.com/client-server-game-architecture.html). 

He explains the basics of the [Client-Server game architecture](https://www.gabrielgambetta.com/client-server-game-architecture.html) and proposes the use of an authoritative server and "dumb" clients as the basis for making online multiplayer games, in addition to describing techniques such as [client-side prediction](https://www.gabrielgambetta.com/client-side-prediction-server-reconciliation.html), [server reconciliation](https://www.gabrielgambetta.com/client-side-prediction-server-reconciliation.html), [entity interpolation](https://www.gabrielgambetta.com/entity-interpolation.html), and [lag compensation](https://www.gabrielgambetta.com/lag-compensation.html) to minimize lag in online games.

If you're interested in making your own online multiplayer games as well, I highly recommend reading Gambetta's articles - they're remarkably well written and explain challenging technical concepts in a clear manner. They helped me a lot while I was building _Tank Battle_'s main game server. Kudos to you, Mr. Gambetta!

### Elo Rating System (Simple Multiplayer Elo)

The [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system) was created in the 1960s by Hungarian-American physics professor [Arpad Elo](https://en.wikipedia.org/wiki/Arpad_Elo) for rating FIDE chess players, but nowadays Elo-based ratings system are widely used in [MMOs](https://en.wikipedia.org/wiki/Massively_multiplayer_online_game) as a means to quantify a specefic player's "true" abilities and to predict how well they will fare against other players. 

A very popular Elo-based system in use today is Microsoft's [TrueSkill rating system](https://en.wikipedia.org/wiki/TrueSkill). Being proprietary software, though, you'd have to pay Big M some hefty dough to get a license to use TrueSkill in your own project. Fortunately, Tom Kerrigan, an independent iOS app developer from Seattle, WA, created a much simpler (and free!) implementation of a multiplayer rating system which he calls [Simple Multiplayer Elo](http://www.tckerrigan.com/Misc/Multiplayer_Elo/). Here's how he describes it:

<blockquote>
I've come up with a simple and effective way to apply the two-player Elo system to multiplayer scenarios: 
<ul>
<li>At the end of a game, make a list of all the players and sort it by performance.   </li>
<li>Think of each player as having played two matches: a loss vs. the player right above him on the list, and a win vs. the player right below him.   </li>
<li>Update each player's rating accordingly using the two-player Elo equations.   </li>
</ul>
I call this method "Simple Multiplayer Elo" (SME) and am making it public domain.  
</blockquote>

Implementing SME from scratch is very straightforward - all you need is to loop over your ranked list of players and run the classic Elo algorithm on pairs of players in a "top-down" manner: first players 1 and 2, then players 2 and 3, etc. The reverse ("bottom-up") approach (first players `n` and `n-1`, then players `n-1` and `n-2`, etc.) will yield very similar results (although not exactly the same as "top-down").

To be honest, I'm not very good when it comes to statistics, so I can't argue on how SME fares agaisnt other ratings systems. Tom claims that his system "approaches ideal accuracy much faster than TrueSkill. Eventually TrueSkill produces ratings that are almost perfect (after hundreds of rounds) but at that point the difference is marginal".

If you're using SME in your project, be sure to send an [email](mailto:tom.kerrigan@gmail.com) to Tom! He's a chill dude.

---

## Next Steps

Even though _Tank Battle_ is, for all intents and purposes, a done deal, there are two very important aspects of this project that I'd consider revisiting in the near-ish future.

### Mitigating Lag

Ironically, one of the game's biggest shortcomings is also one of its main "selling points": networking. If the players have slow internet, or are on opposite sides of the Earth, the game can suffer from lag. Sometimes, it can render the game totally unplayable, even for players with decent broadband.

But as I've mentioned earlier, one of the main topics that Mr. Gambetta discusses in his [Fast-Paced Multiplayer](https://www.gabrielgambetta.com/client-server-game-architecture.html) articles are implementations of techniques to minimize lag in online games, such as [client-side prediction](https://www.gabrielgambetta.com/client-side-prediction-server-reconciliation.html), [server reconciliation](https://www.gabrielgambetta.com/client-side-prediction-server-reconciliation.html), [entity interpolation](https://www.gabrielgambetta.com/entity-interpolation.html), and [lag compensation](https://www.gabrielgambetta.com/lag-compensation.html), which could drastically improve the game's networking performance. 

Unfortunately, adding these extra features to game will be quite time-consuming, and I think this project has already reached its [point of diminishing returns](https://en.wikipedia.org/wiki/Diminishing_returns) with respect to development time and the sense of self-accomplishment that I get from working on it.

### Improving the UI/UX

In its current state, the game's UI does the bare minimum of what it need to do. I managed to implement a somewhat consistent design across the game's webpages, but that could certainly use some work - the website as a whole just feels kind of hacked together and unpolished. 

I also learned the hard way that HTML DOM manipulation with vanilla JS is ridiculously tedious. I'm guessing libraries like [JQuery](https://en.wikipedia.org/wiki/JQuery) could help, but I wanted to build my frontend without any extra libraries (as stated in the project's goals). Even so, it might be high time to try out a proper frontend framework like [React](https://reactjs.org/) to minimize these headaches in future projects.

--- 

## Conclusion

Overall, I'd say that working on _Tank Battle_ has a been a very positive experience, despite the sheer amount of time that it took to finish this project. I learned a lot of really cool stuff though, so I hope I can find similarly interesting and challenging projects to tackle in the next couple of months. 

Over the course of making this game, I've come to realize that web apps are still the undisputed king of software in the 2020's and that's not going to change anytime soon. Facebook, Twitter, Discord, Instagram, Google Docs, Twitch, Spotify, and even VS Code are all web apps made for browsers or that have been adapted as native desktop apps (using [Electron](https://www.electronjs.org/), for instance) or mobile apps. 

Being a competent web dev will ensure that your apps and ideas can reach a massive pool of potential users, so learning web technologies is an absolute must for the up-and-coming software engineer. Plus, companies are still [offering a LOT of money](https://money.usnews.com/careers/best-jobs/web-developer/salary) for expert web dev ninjas.

That being said, as someone who hasn't even started college yet, I'm not sure I'd be happy working as a full-time web developer. Sure, having that sort of skillset is very valuable (and honestly, pretty awesome too), but surely there must be cooler things to do than styling webpages with [Sass](https://sass-lang.com/) or choosing the best [React State](https://areknawo.com/top-5-react-state-management-libraries-in-late-2020/) library, whatever the hell that means.

Doing web dev for _Tank Battle_ has been fun, but I'm looking forward to exploring other things now. Maybe some low-level C/C++ coding on microcontrollers? Studying computer [ISAs](https://en.wikipedia.org/wiki/Instruction_set_architecture)? Embedded Linux? Something else? Honestly, I don't know. Guess we'll have to see. If you've somehow made it this far, I'd love to hear your suggestions.

**Thanks for reading!** Lucca out. ✌