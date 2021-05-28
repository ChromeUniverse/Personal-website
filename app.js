// express
const express = require("express");
const app = express();
const port = 3000;
app.use(express.static('public'));

// filesystem
const fs = require("fs");

// markdown parser
const marked = require("marked");

// yaml parser
const yaml = require('js-yaml');

// load page with file name
function get_page(file_name) {  

  // load base template
  let html = '';
  html += fs.readFileSync(__dirname + '/public/templates/base.html').toString();

  try {
    // load main file   
    file = fs.readFileSync(__dirname + '/public/posts/' + file_name + '.md').toString();

    // get yaml meta data
    let index = file.substr(3, file.length).indexOf('---');
    let yaml_meta = yaml.load(file.substr(3, index));
    console.log(yaml_meta);

    // get post time 
    let unixtime = Date.parse(yaml_meta["date"])/1000;
    console.log(unixtime);

    let content = '';

    // get post content
    content = marked(file.substr(index + 6)); 

    // loading post templates
    let templates = yaml_meta["templates"];
    console.log(templates);
    templates.forEach(t_name => {
      // adding templates to content
      t = fs.readFileSync(__dirname + '/public/templates/' + t_name).toString();
      content += t;
    });
    
    // add content to template
    html = html.replace('CONTENTGOESHERE', content);    
    return [true, html];
  }
  catch (e) {   
    console.log(e);
    
    content = marked("# 404\n\nSorry, couldn't find what you're looking for.");
    html = html.replace('CONTENTGOESHERE', content);    
    return [false, html];    
  }   
  
}

// load all posts
function get_posts() {

}

// get request to /test -> index page
app.get('/*', (req,res) => {  
  // build page
  // let page = get_page('index');  
  // res.status(200);  
  // res.send(page);    

  if (req.url == '/') {
    let index = get_page('index');  
    res.status(200);  
    res.send(index[1]);
    return;
  } 
  else {    

    // if (req.url == '/posts') {
    //   res.status(200);
    //   let page = get_posts(req.url);
    //   res.send(page);
    //   return;
    // }

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

