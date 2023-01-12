---
title: "RedstoneBot ~ Features and Commands"
slug: redstone-features
description: |
    This is the official page of the Redstone Discord Bot.
tags: [redstone-posts]
date: 2021-07-17 20:15:00
public: false
--- 

[*Main page*](/redstone)

This is a list of all of the commands that are currently implemented in RedstoneBot.

This list is also available through RedstoneBot's help command. 


* **Help command**

    Displays the help page.

```js
!redstone help
```
* **Ping command**

    Replies with "Pong!" and shows connection   latency in miliseconds.


```js
!redstone ping
```

* **Status command**

    Displays current server status: "Online", "In queue", "Starting up", etc.

    Also shows additional info about server resources, number of online players, and more.

```js
!redstone status
```

* **List command**

    Shows a list of online players.    

```js
!redstone list
```


* **Time command**

    Shows server locations and queue waiting times.

```js
!redstone time
```

* **Start command**

    Puts your server in the activation queue.

    Specify the server location with [1] (Nuremberg).

    You only need to run this once: it automatically sends user confirmation when you reach the top spot of the queue.


```js
!redstone start [location]
```

* **Exit command**

    Exits the activation queue.

```js
!redstone exit
```

* **Stop command**

    If the server is "Online", this will deactivate the server.

```js
!redstone stop
```

* **Restart command**

    If the server is "Stopped", this will reactivate the server.

```js
!redstone restart
```

* **Setup command**

    Configuration command.

    Links your Discord server to the PloudOS server with the specified IP address.

    **NOTE**: user must have admin permissions to run this command.


```js
!redstone setup [IP]
```

* **Reset command**

    Resets the setup process.

    Can come in handy if you ever change the IP of your PloudOS server.

    **NOTE**: user must have admin permissions to run this command.

```js
!redstone reset
```



