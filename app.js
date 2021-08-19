// express.js setup
const express = require("express");
const favicon = require("serve-favicon")
const path = require('path')

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// filesystem
const fs = require("fs");

// extra consts
const path_to_htmls = __dirname + '/public/htmls/'

// routes 
app.get('/*', (req,res) => {  
  console.log(req.url);

  let req_endpoint = req.url.substr(1);

  // get request to / -> serve index page
  if (req.url == '/') {
    let page = fs.readFileSync(path_to_htmls + 'index.html', 'UTF-8').toString();
    res.status(200);
    res.send(page);
    return;
  } 
  
  else {
    try {
      let page = fs.readFileSync(path_to_htmls + req_endpoint + '.html', 'UTF-8').toString();
      res.status(200);
      res.send(page);
      return;
    } 

    catch (err) {
      let page = fs.readFileSync(path_to_htmls + '404.html', 'UTF-8').toString();
      res.status(404);
      res.send(page);
      return;
    }
  }

});

// start server
app.listen(port, () => console.log(`Server started on port: ${port}`));

