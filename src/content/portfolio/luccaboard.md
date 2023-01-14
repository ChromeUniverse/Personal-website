---
title: LuccaBoard
subtitle: A full-stack interactive comments section inspired by Reddit
slug: luccaboard
index: 3
main-image: /images/portfolio/luccaboard/home.png
source: https://github.com/ChromeUniverse/interactive-comments-section
demo: https://interactive-comments-section.blaring.net/
tech: [react, vite, tailwind, js, ts, node, express, sqlite, prisma]
images: [
  /images/portfolio/luccaboard/home.png,
  /images/portfolio/luccaboard/edit.png,
  /images/portfolio/luccaboard/reply.png,
  /images/portfolio/luccaboard/comment.png,
]
---

This project is my solution to a free coding challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). The main goal was to build out an interactive comments section and get it looking as close as possible to the provided design previews. 

Another requirement was to implement the 4 basic [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations, either client-side only or as a full-stack app, where users would be able to create, edit, and delete comments, as well as rate (upvote/downvote) other users' comments. 

Since I was looking for an extra challenge, I chose to build the full-stack version! 😊 I chose [React](https://reactjs.org/), JavaScript and [Tailwind CSS](https://tailwindcss.com/) for the frontend, which is also fully responsive and looks quite nice on mobile.

The backend is a REST API, and was originally built with [Node.js](https://nodejs.org/), JavaScript, [Express](https://expressjs.com/) and a [SQLite](https://www.sqlite.org/) database, with one-click login authentication provided by [Google Identity Services](https://developers.google.com/identity). I later decided to completely refactor the backend and migrate it to [TypeScript](https://www.typescriptlang.org/). I also took the opportunity to learn [Prisma](https://www.prisma.io/), a type-safe ORM for SQL databases. 

I dubbed the app "LuccaBoard", as in "Lucca's message board", a revolutionary new message board platform for commenting and sharing hot takes to your heart's content. Overall, I'm quite glad with the end result! 