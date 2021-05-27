# The Box World

A simple online lounge for hanging out with friends, where you play as a tiny colorful box. It even has a chat! 

This project was made solely for educational purposes. 

Have any ideas or suggestions? Check out the discussion page [here](https://github.com/ChromeUniverse/The-Box-World/discussions).

This project was partly inspired by Eduardo's [Websockets chat app](https://github.com/qrno/websockets-chat) and [Websockets lounge](https://github.com/qrno/django-websockets).

## Gallery

### Room page

![here](https://media.discordapp.net/attachments/760252264723644426/833543383335043113/unknown.png?width=800&height=500)


## At a glimpe

This is my first full-stack JavaScript web application! 😄 

* **Backend** - Two Node.js servers:
  * One for serving static files (HTMLs, client-side JS scripts and CSS stylesheets)
  * Another one for handling real-time communication over Websockets and room state

  Libraries used: [Express](https://www.npmjs.com/package/express) for static file server, [ws](https://www.npmjs.com/package/ws) for websockets server and [pm2](https://www.npmjs.com/package/pm2) for daemonizing server scripts

* **Frontend**
  * Minimal HTML for the home page (no styling yet) - just a simple POST request form with the user's name and room name.
  * Room page uses CSS with Flexbox for styling and a client-side script with a [p5.js](https://p5js.org/) canvas for graphics and a websocket client

## Websockets message exchange model

### Server -> Client

* Message type `set-id`

  ```js
  {
    type: "set-id",
    id: "372dd9b624af"
  } 
  ```

  Sent to client on every new connection. Specficies a unique hexadecimal ID that the client uses to identify itself when exchanging other messages with the server.

* Message type `set-room`
  ```js
  {
    type: "set-room",
    room-state: 
    {
      "372dd9b624af": {
        id: "372dd9b624af",
        name: "Lucca",
        color: "#0B7A75",
        x: 258,
        y: 225,
      },
      "5b6fd779e7ee": {
        id: "5b6fd779e7ee",
        name: "qrno",
        color: "#F18F01",
        x: 525,
        y: 367,
      }
    }
  }
  ```

  Sent to a client that has just logged in. This message displays the room state prior to the client"s login. 
  
  The client parses out this JSON to set the initial players positions on the p5.js canvas. 

* Message type `new player`
  ```js
  {
    type: "new-player",
    id: "f6759586f1a3",
    name: "Tyuk3",
    color: "#729B79",
    x: 522,
    y: 42,  
  }
  ```

  Sent to all active players in the room. States that a new player has been added to the room.
  
  All clients add the new player to the local player list and the p5.js canvas.

* Message type `room-update`
  ```js
  {
    type: "room-update",
    room-state: 
    {
      "372dd9b624af": {
        id: "372dd9b624af",
        name: "Lucca",
        color: "#0B7A75",
        x: 258,
        y: 225,
      },
      "5b6fd779e7ee": {
        id: "5b6fd779e7ee",
        name: "qrno",
        color: "#F18F01",
        x: 525,
        y: 367,
      },
      "965706c2062e": {
        id: "965706c2062e",
        name: "Vilsu",
        color: "#59D2FE",
        x: 266,
        y: 349,
      }
    }
  }
  ```

  Sent regularly to all active players in all rooms. Represents the current positions for all active players in the room.

  The clients use this data to update the player's position on the p5.js canvas.

* Message type `down-chat`
  ```js
  {
    type: "down-chat",
    id: "372dd9b624af",
    name: "Lucca",
    message: "Hi guys!😄"
  }
  ```

  Sent to all active players in the room when a new chat message is received by the server. The server simply rebroadcasts the new chat message to all clients and doesn't store any information about it. 
  
  The clients parse out this JSON, display a bubble above the corresponging player and add it to the chat.

* Message type `delete-player`
  ```js
  {
    type: "delete-player",
    id: "5b6fd779e7ee",
    name: "qrno"
  }
  ```

  Sent to all players in the room when a client closes its websocket connection and, therefore, has left the room. 

  The clients use this to display an alert on the chat to remove the player from their local player list.



### Client -> Server

* Message type `login`
  ```js
  {
    type: "login",
    id: "372dd9b624af",
    name: "Lucca",
    color: "#0B7A75",
    x: 258,
    y: 225,
    room: "room1"
  }
  ```

  Sent to the server right after the client has received its unique hex ID. 

  The server uses this data to create a room with the specified name, if it doesn't already exist. If it does, it updates the room state.
  
  The server rebroadcasts this data to all players in the same room in the form of a `new-player` message.

* Message type `move`

  ```js
  {
    type: "move",
    id: "372dd9b624af",
    name: "Lucca",
    color: "#0B7A75",
    keys: "wasd",
    room: "room1"
  }
  ```

  Sent to the server when the user presses the arrow keys.

  The server parses this JSON and updates the room state accordingly.

* Message type `up-chat`
  ```js
  {
    type: "up-chat",
    id: "372dd9b624af",
    name: "Lucca",
    message: "Hi guys!😄",
    room: "room1"
  }
  ```

  Sent to the server when the user sends a new chat message.

  The server rebroadcasts this message to all active players in the room in the form of a `down-chat` message.


## Usage (Ubuntu Linux)

* Clone this repo and `cd` into it

`git clone https://github.com/ChromeUniverse/The-Box-World.git`

`cd The-Box-World`

* Make sure you have Node.js installed

`node --version`

(Install it if haven't already)

`sudo apt update`

`sudo apt install nodejs`

* Install packages with npm

`sudo npm install -g`

(If that doesn't work, you'll have to install packages manually)

`sudo npm install express -g`

`sudo npm install ws -g`

`sudo npm install pm2 -g`

* Start server scripts with PM2

`pm2 start app.js`

`pm2 start websockets.js`

## Folder Structure


```
.
├── bash                    # bash shell scripts
├── node modules            # node.js packages
├── static                  # static files (HTMLs, client-side scripts and stylesheets)
|
├── package.json            # npm packages
├── package-lock.json
|
├── app.js                  # node.js Express server
├── websockets.js           # node.js websockets server
|
├── messages.txt            # mockups for websocket messages
└── .gitignore
```

## Progress

As you can see, a fair amount of progress has been made with this project.

* Functional multiplayer
* Periodic server pinging and player timeout
* Working chat with message bubble
* Two players can now have the same name
* Users automatically time out and and are removed from the room after 5 seconds of inactivity
* Room page has some ✨fancy CSS✨ styling
* Changed script daemonizer module to [PM2](https://pm2.keymetrics.io/)
* Chat now displays alert messages (e.g.:_Player joined the room_ and _Player has left the room_) 
* Added chat auto-scroll (when receiving new messages) and improved chat styles
* Room page now uses Flexbox-based styling
* Added simpler (and more efficient/more effective!) player timeout and remove functions
* Added multiple room functionality
* Added responsive design for mobile devices
* Implemented fully server-side room state processing (client now only sends keypresses to server)
* Added styles for main page 

## Todo

* Add actual fun features (games, video watch-along, something idk)      
* "Crown" Player system and special privileges
  * First player to enter the room has the crown - when they leave, crown is passed on to the second player, third, and so on, until the room is empty
  * Crown player can kick other players from the room
* Improve UI 
  * Mobile 
    * Actual control buttons
    * Button for showing/hiding chat in mobile

* Add navigation buttons
  * Change room
  * Return to home page   

* Far out ideas
  * Add WebRTC-based voice chat
 