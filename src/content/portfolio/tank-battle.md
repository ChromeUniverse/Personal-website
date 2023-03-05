---
title: Tank Battle
subtitle: A tank combat game with real-time online multiplayer
slug: tank-battle
main-image: /images/portfolio/tank-battle/game-room.png
source: https://github.com/ChromeUniverse/Tank-Battle
article: building-tank-battle
tech: [html, css, js, node, express, ws, mysql, aws]
images: [/images/portfolio/tank-battle/game-room.png, /images/portfolio/tank-battle/home.png, /images/portfolio/tank-battle/lb.png]
---

TankBattle is a remake of an .io game called [TankRoyale](https://tankroyale.io/), which itself is just another another adaptation of the classic 2D top-down tank combat game genre.

This web game was actually the first real full-stack web app I ever made. The frontend is just vanilla HTML, CSS and JS, with [p5.js](https://p5js.org/) as the main graphics library. The backend consists of two Node.js servers - one being a REST API and authentication service powered by [Express](https://expressjs.com/), and one for real-time data streaming over WebSockets using [ws](https://github.com/websockets/ws). A [MySQL](https://www.mysql.com/) database is used for storing and querying user data.


TankBattle is by far one of the most fun and rewarding programming projects I have ever built. It was also the project that inspired me to continue learning web development and to one day become a full-stack software engineer!