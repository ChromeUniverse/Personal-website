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
  let html = fs.readFileSync(__dirname + '/public/templates/base.html').toString();
  let text;

  try {
    // load content   
    text = fs.readFileSync(__dirname + '/public/posts/' + file_name + '.md').toString();
    // convert markdown -> HTML
    text = marked(text);
    // add content to template
    html = html.replace('CONTENTGOESHERE', text);    
    return [true, html];
  }
  catch (e) {    
    text = marked("# 404\n\nSorry, couldn't find what you're looking for.");
    html = html.replace('CONTENTGOESHERE', text);    
    return [false, html];    
  }   
  
}


// get request to /test -> index page
app.get('/*', (req,res) => {  
  // build page
  //let page = get_page('index');  
  // res.status(200);  
  // res.send(page);    

  if (req.url == '/') {
    let index = get_page('index');  
    res.status(200);  
    res.send(index[1]);
  } 
  else {    
    let page = get_page(req.url);
    if (page[0]) {
      res.status(200);
    } else {
      res.status(404);
    }
    res.send(page[1]);
  }


});

// start server
app.listen(port, () => console.log(`Server started on port: ${port}`));

