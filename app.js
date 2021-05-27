// express
const express = require("express");
const app = express();
const port = 3000;
app.use(express.static('public'));

// filesystem
const fs = require("fs");

// markdown parser
const marked = require("marked");

// load page with file name
function get_page(file_name) {  
  // load template
  let html = fs.readFileSync(__dirname + '/templates/base.html').toString();
  // load content
  let text = fs.readFileSync(__dirname + '/posts/' + file_name + '.md').toString();
  // convert markdown -> HTML
  text = marked(text);
  // add content to template
  html = html.replace('CONTENTGOESHERE', text);
  return html;
}


// get request to /test -> index page
app.get('/test', (req,res) => {  
  res.status(200);  
  // build page
  let page = get_page('index');
  res.send(page);
});

// start server
app.listen(port, () => console.log(`Server started on port: ${port}`));

