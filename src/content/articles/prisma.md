---
title: SQL is dead — long live Prisma!
slug: prisma-learning
description: |
  Some thoughts on Prisma and how I've been using it on several full-stack TypeScript projects over the past few months.
tags: [programming, databases, backend]
img-preview: |  
  /images/prisma-thumbnail.png
date: 2023-03-07 16:15:00
public: true
--- 

There's no way to sugarcoat it: **databases are hard**. 

The traditional workflow for SQL databases in particular is quite complicated: define a schema, create tables, add fields, link tables together with foreign keys, apply your changes to your DB... Good luck if you need to change a field's datatype, cause trying to apply your migrations without breaking everything is a headache. When it comes to querying data, you'll need to write raw SQL which can get pretty ugly, especially with `JOIN` queries. 

This was the workflow I used for [building Tank Battle](/blog/building-tank-battle), back in October 2021. And it sucked.

It's all very intimidating for beginners who just want to dip their toes in some backend programming. And it's a slow process too — I've always had a hard time trying to get in the flow state whenever I'm doing SQL development.

But what if I told you — that there was another way? 

![Red pill or blue pill](https://media.tenor.com/5NU8u6qKF_AAAAAC/pills-drugs.gif)

What if I told that there's a world out there where you don't need to write god-awful raw SQL? Where your schemas are basically plain English? Where your queries are fully type-safe? Where modeling relationships isn't a huge drag anymore? Where relational databases are actually exciting?

Enter **Prisma** — the database tool of the future. Wanna head down this rabbit hole with me?

![Taking the red pill](https://media.tenor.com/UrlkjG6whskAAAAC/matrix-blue-pill.gif)


---
## What is Prisma?

Okay, I feel like I should get this out the way — the title of this article is a bit misleading. Prisma is a tool that abstracts away SQL from you instead of replacing it — it makes easier for you, as a backend dev, to build, connect and run queries on relational databases [(and MongoDB too!)](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb#prerequisites).

Prisma is a pretty extensive open-source project. It's an NPM package with a TypeScript library, a CLI, and a full-fledged web GUI. But in short, it's comprised of three main parts:
- **[Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)**: a fully type-safe [object-relational mapper](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) library for Node.js.
- **[Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)**: a set of tools for applying database migrations.
- **[Prisma Studio](https://www.prisma.io/docs/concepts/components/prisma-studio)**: a visual, web-based database browser and editor.

Well, there's an additional fourth part that's common to all the items above: the [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema). The schema is the single source of truth for your data — it's where you define your DB connection, how the Prisma client library is generated (more on that later) and how you want your data models to look like. It allows you to define a declarative schema for your DB (or even [generate it via introspection](https://www.prisma.io/docs/concepts/components/introspection)!) using the Prisma Schema Language (PSL). 

The Prisma client's type safety is a bit peculiar, as it relies on code generation, just like the client library itself. Still, it's is a huge win for server-side TypeScript programs.

The [Prisma docs](https://www.prisma.io/docs) do a much better job than I ever could of explaining these topics so I'll just you to them - these docs are phenomenal and I highly recommend reading through the first few pages before moving on. 

Fireship also made made an awesome YouTube video explaining [Prisma in 100 seconds](https://www.youtube.com/watch?v=rLRIB6AF2Dg).

---
## Why Prisma?

The docs also do a great job of explaining the [motivation for Prisma](https://www.prisma.io/docs/concepts/overview/why-prisma). The TL;DR is that in the world of database tooling, there's an inherent trade-off to be made between *control* over the SQL that's being run against your DB and your overall *productivity* as a backend developer. 

Prisma aims to strike a balance between both, but chooses to prioritize productivity over control, abstracting complex queries from you in an attempt to address common [SQL anti-patterns](https://www.prisma.io/docs/concepts/overview/why-prisma#application-developers-should-care-about-data--not-sql) and overcome [issues faced by other tools](https://www.prisma.io/docs/concepts/overview/why-prisma#problems-with-sql-orms-and-other-database-tools) in the Node.js ecosystem.

The [Should you use Prisma?](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma) page is a very interesting read too - it shows a list of compelling use-cases for Prisma as an ORM for Node.js + TypeScript apps. But the docs also acknowledges the fact that developers can have different priorities and that Prisma might not be a good fit for all projects — particularly if you need [full control over queries](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma), if you [don't want to write backend code](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma) at all, or you [just need a dead-simple GraphQL API](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma).

One thing that has really stood out to me about Prisma is how fast it feels — just make changes to your schema, apply it with `npx prisma db push`, test your server-side code, and repeat. No need to worry about migrations or losing your data. And even if you *have* to reset your DB, you can re-populate it easily by setting up a [simple DB seeding command](https://www.prisma.io/docs/guides/database/seed-database).

---
## How to learn Prisma?

Going back to the point I made at the start of this post — databases are hard, but Prisma won't magically make them trivial either. Don't get me wrong, it definitely makes working with DBs a **lot** easier, but you'll still need to do some work to get familiar with these tools.

If you're just getting started, I can't recommend Web Dev Simplified's [Learn Prisma in 60 minutes](https://www.youtube.com/watch?v=RebA5J-rlwg&pp=ugMICgJlbhABGAE%3D) video highly enough. It's an expertly-made tutorial that covers all of the topics in this article (and tons more that I've probably forgotten about) in just under an hour.

Once again, I'll refer you the Prisma docs, specifically the [Guides section](https://www.prisma.io/docs/guides), which has several detailed articles that cover just about anything, from [seeding your database](https://www.prisma.io/docs/guides/database/seed-database) to [deploying it to production](https://www.prisma.io/docs/guides/deployment/deployment).

### Local development workflow

Also, I think it's worth pointing out what the typical Prisma workflow looks like: 
- Create a [schema](https://www.prisma.io/docs/concepts/components/prisma-schema), either by [writing one yourself](https://www.prisma.io/docs/concepts/components/prisma-schema#example) or [introspecting an existing database](https://www.prisma.io/docs/reference/api-reference/command-reference#db-pull).
- [Push the schema](https://www.prisma.io/docs/reference/api-reference/command-reference#db-push) to your database using Prisma Migrate.
- [Generate](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client) the client library (usually done automatically during the previous step).
- [Run your DB queries](https://www.prisma.io/docs/concepts/components/prisma-client/crud) using the Prisma Client ORM in your server-side application code.

You'll be following the workflow above as you're prototyping your database and doing local development. As you get used to running queries with the ORM, updating the schema, and applying migrations, this workflow should become second nature after a while.


---
## Integrating Prisma into my personal projects

As I've covered in a [previous post](/blog/react-calculator-fem-challenge), I've been devoting a lot of time over the past year to learning full-stack web dev, and I've been really hyped about learning TypeScript and TS-related stuff like the [T3 stack](https://create.t3.gg/). In fact, Prisma one of the main technologies used in the T3 stack due to its robust type safety. 

And as I've mentioned in the beginning of this post, I hate the traditional SQL workflow. It's slow, tedious error-prone, and just plain hard AF. I knew I needed to look for an alternative, but NoSQL DBs didn't seem like a suitable replacement either. 

### LuccaBoard -- learning the API

I was looking to improve my DB development workflow and I had heard about Prisma from watching YouTube videos from [Fireship](https://m.youtube.com/c/Fireship), [Ben Awad](https://www.youtube.com/channel/UC-8QAzbLcRglXeN_MY9blyw) and [Theo](https://www.youtube.com/@t3dotgg), so I felt it was worth giving it a shot. This was back in September 2022, and at the time I was building [LuccaBoard](/portfolio/luccaboard/), a Reddit-like comments section app with a React frontend, a Node.js + Express backend, and a SQLite database.  

If possible, I highly recommend **incrementally learning and adopting Prisma** by integrating it into existing projects, which I did by migrating the app's backend from vanilla JS and `better-sqlite3` to TypeScript and Prisma. I started by installing it from NPM and running `npx prisma db pull` to introspect my SQLite DB and generate a schema. By generating a schema via introspection, I only really had to worry about learning the Prisma ORM syntax and could leave the schema part for a later project. This proved to be really nice way to break down the Prisma learning curve into smaller chunks, making it easier to learn and much more manageable.

Now, I'll admit, it took me a while to get familiar with the ORM's API, but it's still pretty straightforward for the most part. Methods like `.findUnique()` and `.findMany()` replace SQL's `SELECT`, `.create()` and `.createMany()` replace `INSERT`, and so. [Relation queries](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries) are a bit confusing at first: joining tables through read operations can be through something called [nested reads](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-reads). [Nested writes](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-reads) also exist for when you need to create related records in a single query, but a much more useful feature is [connecting/disconnecting existing records](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#connect-an-existing-record) together, which essentially links two distinct models together.

### LuccaChat -- learning to build schemas

The next full-stack project I tackled with Prisma was [LuccaChat](/portfolio/**luccachat**). I was starting from scratch this time around, so I had to create my own Prisma schema and models for my PostgreSQL database. This process was fairly straightforward as well, but the hardest part turned out to be representing relationships between models in the schema. 

Prisma can model the three basic types of database model relations -- **one-to-one** (1-1), **one-to-many** (1-n) and **many-to-many** (m-n) -- which are represented in Prisma Schema Language as [relation fields](https://www.prisma.io/docs/concepts/components/prisma-schema/relations#annotated-relation-fields), as opposed to your regular scalar data fields. The syntax for representing these relations is pretty concise (check out [this example](https://www.prisma.io/docs/concepts/components/prisma-schema/relations#types-of-relations)), and does it a good job of abstracting the underlying foreign keys in the actual database. 

It's also worth noting that many-to-many relations can be either [explicit](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#explicit-many-to-many-relations) or [implicit](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#implicit-many-to-many-relations), depending on whether or not you'd like to represent the [mapping table](https://en.wikipedia.org/wiki/Associative_entity?useskin=vector) in your schema. 

This is an important consideration to make when building and connecting your models. In LuccaChat, for instance, I needed a many-to-many relation between *users* and *chats* (after all, users can participate in many chats and chats can have many users) but since I didn't need a mapping table, an implicit relation was enough. But in LuccaBoard, I needed a many-to-many relation for comment ratings (users can upvote many comments, comments can be upvoted by many users) so an explicit mapping table is necessary to keep track of who was upvoting or downvoting what, and to compute the comment's score based on the ratings.

But I digress -- after the schema was complete and the models are all properly connected, I could focus on more important parts of the chat app, such as building an end-to-end, type-safe, live messaging protocol over WebSockets.


---
## New challenger approaching?

Just as I was wrapping up this post, [Dax Raad](https://twitter.com/thdxr) posted a YouTube video titled [The Prisma killer is finally here](https://www.youtube.com/watch?v=3tl9XCiQErA&ab_channel=SST), which immediately grabbed my attention. 

Enter [Drizzle](https://github.com/drizzle-team/drizzle-orm) -- a bleeding-edge SQL ORM which doubles down on deep integrations with TypeScript. Like Prisma, Drizzle is a fully type-safe Node.js ORM (`drizzle-orm`) and migration tool (`drizzle-kit`) for relational databases -- but that's about where the similarities end. Drizzle also has its own schema, but it doesn't use a dedicated language -- it's just TypeScript. This allows Drizzle to just use TS inference for its strong typing instead of having an additional code generation step. 

That said, the schema and ORM syntax look a lot more verbose than their Prisma equivalents. Going back to the ORM control vs. productivity trade-off I mentioned earlier, Drizzle appears goes in the opposite direction of Prisma by having an ORM that maps a lot more closely to SQL and giving you more control over your queries. In fact, this is what their [readme](https://github.com/drizzle-team/drizzle-orm#readme) has to say:

> The ORM main philosophy is "If you know SQL, you know Drizzle ORM". We follow the SQL-like syntax whenever possible, are strongly typed ground top and fail at compile time, not in runtime.

Drizzle is still very early-stage software -- but I'm super hyped to see where it's headed!

---
## Conclusion

We are currently experiencing a [full-stack revolution](https://www.youtube.com/watch?v=X67_ecp6PC8&ab_channel=Theo-t3%E2%80%A4gg) in the web dev world. 

We've seen huge leaps in the past few years in simplicity and quality of technologies across the entire web stack: frontend, backend, infra, *and* databases. The entry barrier to become a full-stack dev has never been lower. And not just that -- the underlying tech has just gotten better too. And that's thanks in no small part to awesome tools like Prisma and TS.

Prisma is the database toolkit I've always wanted in my JS/TS stack. The ORM is intuitive to use, the migration tools are great, and the schema language makes representing models and relations a breeze. And my favorite part: working with databases isn't a drag anymore. It's a fantastic piece of tech and I can totally  see myself using it in 2023 and beyond.

It's far for being perfect. Like any software without its faults -- but that's why we have alternatives like Drizzle who are rising to the challenge. 

I hope this post has helped learn a bit more this awesome piece of database tooling, and maybe even convinced to try it out for yourself. 😉

Peace ✌