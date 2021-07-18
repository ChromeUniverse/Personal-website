---
title: "RedstoneBot ~ User Manual"
templates: []
description: |
    A short user manual for setting up RedstoneBot.
groups: [redstone-posts]
date: 2021-07-17 20:15:00
--- 

[*Main page*](/redstone)

Welcome! This is the user manual for RedstoneBot.

This short guide will show you how to add and setup RedstoneBot for your Discord server.

_Looking for how to create a clone of RedstoneBot instead? [Take a look here.](https://github.com/ChromeUniverse/RedstoneBot#usage-ubuntu-linux)_

  

## Step 1: Add Redstone to your Discord server

[Click here](https://discord.com/oauth2/authorize?client_id=769761270269476887&permissions=8&scope=bot) to add Redstone to your server.

![](https://media.discordapp.net/attachments/760252264723644426/804124108861734962/unknown.png?width=1044&height=600)

Choose the server you want to add Redstone to and complete the Captcha.

Next, you'll need to give Redstone permission to open and close your server.  
  
  

## Step 2: Give RedstoneBot permission to control your PloudOS server

Login to [PloudOS](https://ploudos.com) and access your server list [here](http://ploudos.com/server/).

![](https://media.discordapp.net/attachments/760252264723644426/804126475539709952/unknown.png?width=1385&height=600)

Next, choose the server you want Redstone to control (Note: you must be the server's owner).

Open the server's management page.

![](https://media.discordapp.net/attachments/760252264723644426/804127300865228800/unknown.png?width=1395&height=600)

Scroll down and click the "Share Server" tab on the bottom left.

![](https://media.discordapp.net/attachments/760252264723644426/804128138908925973/unknown.png?width=671&height=600)

Share your server with the user **RedstoneBot**. Give it permission to open and close your server by selecting the checkboxes. Then, click the "Share" button.

![](https://media.discordapp.net/attachments/760252264723644426/804129626880213002/unknown.png?width=812&height=600)

Hang on, we're almost there!  
  
  

## Step 3: Run the _setup_ command

Open Discord on your [browser](https://discord.com/app) or desktop. Then, go to the server you just added Redstone to.

_Protip: if you haven't already, you might want to create a separate channel or category just for bots and mute it. Bots are annoying, sometimes._ 😕

Now, you'll need to link your Discord server to the PloudOS server you want Redstone to control.

All you need to do is run the _setup_ command and specify your server's IP address, like so:

```js
!redstone setup myverycoolserver.ploudos.me
```

![](https://media.discordapp.net/attachments/760252264723644426/804130942050107402/unknown.png)

If all goes well, you'll get a confirmation message. If you entered an incorrect/invalid IP, just try again.

If you're sure you're entering a valid IP but didn't get the message in the picture above, then please make sure Redstone has permissions to manage your server, as described in step 2.

  

## Done! Redstone is ready to roll.

That's all there is to it! To make sure Redstone works, use the _status_ command, like so:

`!redstone status`

![](https://media.discordapp.net/attachments/760252264723644426/804131538161369098/unknown.png?width=778&height=600)  

**\> More Features**

Take a look at the [commands page](#) or use the _help_ command to see all of Redstone's features.

```js
!redstone help
```
