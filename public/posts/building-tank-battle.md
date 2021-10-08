---
title: "Bulding _Tank Battle_, an online multiplayer combat game" 
templates: []
description: |
  The full project write-up and development log for _Tank Battle_.
groups: []
date: 2021-10-07 18:52:00
--- 

Back in April 2021, I decided to mess around with the awesome [p5.js](https://p5js.org/) graphics library for the first time with the help of my friends Eduardo and Heitor, just for fun. Soon enough, I found myself watching Daniel Shiffman's (a.k.a The Coding Train) great [p5.js tutorials](https://www.youtube.com/watch?v=HerCR8bw_GE&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA) on YouTube to learn some p5 basics: how to draw some colorful shapes on the p5 canvas, how to read keyboard inputs, how to use JS classes, integrating p5 into HTML pages... 

We ended up building a simple game where you could control a box-like character and move around around in a blank background - this eventually turned into [_The Box World_](https://github.com/ChromeUniverse/The-Box-World), a Club Penguin-like lounge game where you can create rooms, invite your friends, walk around and chat with your buddies by sending messages in the room chat.

Around the same time, I happened to find a pretty neat .io game, [TankRoyale.io](https://tankroyale.io/), and it didn't take me long to realize that I could probably build my own version of that game with the technologies that I already knew. So that's exactly what I did, and that's how _**Tank Battle**_ was born! 

Over the next couple of months, I would work on the project sporadically, implementing cool features, learning tons of new things, and of course, breaking my code hundreds of times, doing complete project rewrites, and banging my head on the wall endlessly while fixing my neverending problems. 

Nevertheless, I managed to once again cross the gruesome valley of coding confusion and emerged victorius with my project finally completed in early October of 2021. As of writing this, _Tank Battle_ is online and you can check it out [here](http://18.229.196.24:4000/).

![](https://media.discordapp.net/attachments/760252264723644426/895442475278274580/unknown.png?width=1343&height=665)

<p class="img-caption"> <i>Tank Battle</i> game room with two players </p>

---

## Goals

Before I began this long and arduous web/game development journey, my primary goal was just to get a small prototype working to show off to my friends. However, as with literally any software side project ever, [feature creep](https://en.wikipedia.org/wiki/Feature_creep) started to kick in. 

The project's scope grew quickly and my goals started expanding. I started thinking about adding things which, at the time, I didn't have any prior experience: How about a fully fledged database? Maybe even user authentication? An API for fetching leaderboard rankings, player stats and user data? Things like that. 

Even so, eventually I decided that these extra features added useful fucntionality to the "end product", so to speak, and warranted some extra blood, sweat and tears to bring them to life. And so, [filled with detemmienation](https://www.youtube.com/watch?v=i9KKnll-RN0), I added them to the to-do list and started implementing some extra spicy features to the game.

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

Fortunately, I was actually able to meet almost 100% of the goals I had outlined for this project, even including the features that were added to my to-do list during the later stages of development. (yay!) Seeing this project through to the end was incredibly rewarding and satistying.

---

## How I built it

Since _Tank Battle_ is essentially another fullstack web app created by yours truly, you can definitely expect some of the usual suspects to be driving the inner workings of this project. However, there are a couple of very important special guests this time round, without whom this project wouldn't be complete.

### Frontend

As with all my web dev projects so far, I'm using vanilla HTML, CSS and JS on the frontend. No fancy frameworks like React/Vue/Angular here.

![](https://media.discordapp.net/attachments/760252264723644426/895500676749213776/unknown.png?width=739&height=665)

<p class="img-caption"><i>Tank Battle</i> Home Page</p>

The frontend code is also pretty straightforward - most of it is just HTTP requets made with the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and DOM manipulation with vanilla JS.

Other that that, there's only two other special things I'd like to note here. Firstly, (and as I've said before) I'm using [p5.js](https://p5js.org/) for the graphics in the game room page - this includes doing things drawing the rooms, players, bullets, obstacles and game prompts. Secondly, I'm using the native browser [WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) for exchanging JSON-encoded messages over WebSockets with the main game server.

<!-- If you've never heard of p5.js before, in a lot of ways it's basically [Processing](https://processing.org/) for the web browser - you can use it to draw almost anything on an HTML canvas and even make some fun animations. -->


### Backend

Building the frontend for _Tank Battle_ was a relatively simple task - all I had to do was build a minimal UI with vanilla HTML and CSS and and write some code to perform a couple of HTTP requests to the webserver. But building a reliable, feature-rich, modular and easily maintainable backend though, that was the real challenge here.

Of course, since I've now become a Certified JavaScript Simp™, I absolutely refuse to use anything other than [Node.js](https://nodejs.org/en/) for my web apps' backend. In this case, I'm running two Node servers.

One of them acts as the main webserver, powered by the good ol' [Express.js](http://expressjs.com/) framework. It's taking care of a whole lot of stuff behind the scenes:

* It serves static files (mostly client-side scripts, stylesheets and a favicon) with the [Express static file middleware](https://expressjs.com/en/starter/static-files.html)

* Handles API requests for leaderboard rankings and user data using the [Express Router](https://expressjs.com/en/guide/routing.html#express-router)


![](https://media.discordapp.net/attachments/760252264723644426/895442180104126544/unknown.png?width=730&height=665)

<p class="img-caption"> <i>Tank Battle</i> Leaderboard </p>


* Connects to a MySQL 8.0 database with a connection pool and perform SQL queries using [mysql2](https://www.npmjs.com/package/mysql2)

* Authenticates and logs in users with [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken)

* Creates new player accounts and keeps their passwords safe by hashing and salting them with [bcrypt](https://www.npmjs.com/package/bcrypt) before storing them in the MySQL database.

The other Node program is the main game server. It acts as a WebSockets server and also runs all of the game logic. Out of the two Node servers, the main game server is the one doing the heavylifting here:

* It handles all of the real-time bidirectional communication by exchanging messages with clients (i.e. players and spectators) over [WebSockets](https://www.npmjs.com/package/websockets)

* Manages the states of all the game rooms, including room metadata (number of players, current match state, etc.), spectators, players, obstacles, and bullets.

* Runs the main game loop, which consists of:

  * Updating the match state for all game rooms according to the match state lifecycle (i.e. switching between "Waiting for players to join", "Pre-match", "Match running", "Post-match" states when appropriate)

  * Receiving user inputs and queueing them up for later processing - this includes player movement, shots, room spectation and room join requests.

  * Running all game physics - this includes player motion, projectile motion and ricochets (i.e. reflecting off walls and obtacle edges), and collision detection between different entities (players, solid obstacles, bullets, room walls)

  * Sending the current game state back to all players and spectators in all rooms

The backend is hosted on an AWS EC2 instance (a free-tier eligible one, of course) located in São Paulo, in order to minimize latency. Most of the people who will try out _Tank Battle_ are most likely going to be relatives or close friends of mine who live here in Brazil anyways, so I might as well deploy my app to a nearby host.

If you'd like to self-host your own version of _Tank Battle_, I've got detailed instructions [here](https://github.com/ChromeUniverse/Tank-Battle).

---

## New technologies that I learned

_Tank Battle_ is by far the most complex and demanding software project I've worked on to date. I've learned **a lot** of really cool things during the game's development cycle, and honestly, I would've never thought I would have accomplished all of this.

### Node.js/Express backend

I've been using the Node.js + Express combo for literally 100% of my web projects for the past year and so far it's worked remarkably well. This time round, though, I found that using the [Express Router](https://expressjs.com/en/guide/routing.html#express-router) made a _huge_ difference in making my webserver code more modular and maintainable by splitting all of the route logic into separate files. 

The Router also proved to be very useful for making a simple API. It only has a couple of endpoints, notably, `/lb`, which returns a JSON with the leaderboard data, and `/user`, which returns a JSON with player stats.

### User authentication

Authentication systems for web services are notoriously difficult to implement by yourself in a production setting. If you plan on shipping your code as part of an actual product, you'll most likely have to use an Identity-as-a-Service provider like [Firebase Auth](https://firebase.google.com/docs/auth/) by Google, [Auth0](https://auth0.com/), [Okta](https://www.okta.com/), [Cognito](https://auth0.com/) by AWS, etc. If you're wondering why, I recommend taking a look at this [great article](https://withblue.ink/2020/04/08/stop-writing-your-own-user-authentication-code.html) by Alessando Segala.

That being said, since _Tank Battle_ isn't a serious product (like, at all), I can totally get away with just using [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) (JWT) and [web cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) for user auth. When a user fills out the login form, the browser makes a `POST` request to `/login` with a JSON containing the the user's username and password. Once the webserver receives the request, it checks the database to see if the username/password combination is valid, in which case it will send a JWT inside a cookie back to the user's browser. 

While this approach _might_ be prone to a [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attack, it's simple and quite effective, and any vulnerabilities should be mitigated by using the `HttpOnly`, `SameSite` and `Secure` cookie attributes. 

### SQL relational database

I took this opportunity to try out the [SQL](https://www.youtube.com/watch?v=zsjvFFKOm3c&t=56s) language and a [relational database](https://en.wikipedia.org/wiki/Relational_database#RDBMS) system for the first time. If you're looking for a quick and easy way to get started with SQL too, I suggest taking a look at Khan Academy's awesome [Intro to SQL](https://www.khanacademy.org/computing/computer-programming/sql) course. It's just as good as any other course from Khan Academy, and I'm sure you'll find it as engaging as I did. Plus: it's 100% free!

When it comes to setting up a actual SQL database for your app, though, two common open-source options come to mind: [MySQL](https://en.wikipedia.org/wiki/MySQL) and [SQLite](https://en.wikipedia.org/wiki/SQLite). These are completely different relational database systems that work in very different ways. MySQL is a fully-fledged program (i.e. a database server) that requires a local or remote TCP connection in order to perform SQL queries. On the other hand, a SQLite database is contained entirely inside a single file. For more on MySQL vs. SQlite, consider reading this [comparison](https://www.hostinger.com/tutorials/sqlite-vs-mysql-whats-the-difference/) by Hostinger. 

In the end, I chose MySQL as it's more commonly used with Node.js than SQLite. As far as Node packages go, I'm using [`mysql2`](https://www.npmjs.com/package/mysql2) to connect to MySQL (don't forget to use [connection pooling](https://github.com/sidorares/node-mysql2/issues/939#issuecomment-932748114)!) and perform all sorts of queries. You could also use a popular Object-Relational Mapper (ORM) like [`sequelize`](https://www.npmjs.com/package/sequelize), which works with lots of different flavors of SQL, including MySQL and SQLite.

If you're looking for a tutorial on how to setup a MySQL server on your system, then check out this awesome [article](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) from DigitalOcean or this great [tutorial](https://www.youtube.com/watch?v=Cz3WcZLRaWc) from Fireship on YouTube. 

### Async programming

### Client-Server game model

G. Gambetta article tips

[Fast-Paced Multiplayer](https://www.gabrielgambetta.com/client-server-game-architecture.html)

### Elo Rating System (Simple Multiplayer Elo)

SME

[post by Tom Kerrigan](http://www.tckerrigan.com/Misc/Multiplayer_Elo/)

> _Hi Lucca,   
Cool, thanks for letting me know that you're using it. I'm glad the system is working well for you!   
I've never heard of ".io" but I see this is a tank battle game. Reminds me of some games I used to play on the Macintosh in the mid 90s. Let me know when it's playable by the public, I'd check it out. :)     
\- Tom_

--- 

## Next Steps

G. Gambetta article

--- 

## Conclusion

Thanks for reading!
