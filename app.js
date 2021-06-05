// express.js setup
const express = require("express");
const app = express();
const port = 3000;

// filesystem
const fs = require("fs");

// get request to /test -> index page
app.get('/*', (req,res) => {  
  console.log(req.url);

  let req_endpoint = req.url.substr(1);

  if (req.url == '/') {
    let page = fs.readFileSync(__dirname + '/public/htmls/index.html', 'UTF-8').toString();
    res.status(200);
    res.send(page);
    return;
  } 
  
  else {
    try {
      let page = fs.readFileSync(__dirname + '/public/htmls/' + req_endpoint + '.html', 'UTF-8').toString();
      res.status(200);
      res.send(page);
      return;
    } 

    catch (err) {
      let page = fs.readFileSync(__dirname + '/public/htmls/404.html', 'UTF-8').toString();
      res.status(404);
      res.send(page);
      return;
    }
  }

});

// start server
app.listen(port, () => console.log(`Server started on port: ${port}`));

