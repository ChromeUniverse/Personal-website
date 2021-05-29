// express
const express = require("express");
const app = express();
const port = 3000;
app.use(express.static('public'));

// filesystem
const fs = require("fs");

// path
// const path = require('path');

// markdown parser
const marked = require("marked");

// yaml parser
const yaml = require('js-yaml');

// load page with file name
function get_page(file_name, load_base = true) {  

  // load base template
  let html = '';

  try {
    // load main file   
    file = fs.readFileSync(__dirname + '/public/posts/' + file_name + '.md').toString();

    // get yaml meta data
    let index = file.substr(3, file.length).indexOf('---');
    let yaml_meta = yaml.load(file.substr(3, index));
    // console.log(yaml_meta);

    // get post time 
    let unixtime = Date.parse(yaml_meta["date"])/1000;
    // console.log(unixtime);

    let content = '';

    // loading post templates
    let templates = yaml_meta["templates"];
    if (!templates.includes('github-fetch.md')) {
      // add post title
      content += marked('# ' + yaml_meta["title"]);  // add title
      content += marked('\n---\n');
              
      // add post date
      let date = yaml_meta["date"];
      content += '<p class="date">Published on ' + date.getFullYear() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate() + '</p>';
    }
    
    // get post content
    content += marked(file.substr(index + 6)); 

    
    // console.log(templates);
    templates.forEach(t_name => {

      // check if post requires a GitHub fetch template
      if (t_name = 'github-fetch.md') {  

        console.log('got here!');

        // formatting URLs
        let github_url = yaml_meta["github-url"].toString();
        let mini_url = github_url.slice(19);
        console.log(mini_url);

        // loading and modifying template
        t = fs.readFileSync(__dirname + '/public/templates/' + t_name).toString();
        t = t
              .replace('FULLURL', github_url)
              .replace('MINIURL', mini_url)
              .replace(/readme/g, mini_url)
              .replace(/repo-link/g, github_url)
              // .replace('mini', 'mini' + mini_url)
        content += t;
      } else {
        // adding templates to content
        t = fs.readFileSync(__dirname + '/public/templates/' + t_name).toString();
        content += t;
      }

      
    });

    if (load_base == true) {
      // load base template
      html += fs.readFileSync(__dirname + '/public/templates/base.html').toString();
      // add content to base template
      html = html.replace('CONTENTGOESHERE', content);    
    } else {
      html = content;
    }      
    
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
function get_posts(res) {

  let html = '';
  // add base template
  html += fs.readFileSync(__dirname + '/public/templates/all.html').toString();
  // load content from all files
  content = '';

  // scan posts directory for all posts
  fs.readdir(__dirname + '/public/posts/', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    console.log(files);

    // looping over files
    files.forEach(f => {

      // get post whitout loading base template
      let endpoint = f.substr(0,f.length-3);

      let post = get_page(endpoint, false);
      // console.log(post)
      let post_content = post[1]      

      // add post content
      content += marked('[_Read this post in full_](' + 'http://localhost:' + port + '/' + endpoint + ')');
      content += '<div class="post">'
      content += post_content;
      content += '</div>'
    });
    // add content to template
    html = html.replace('CONTENTGOESHERE', content);        

    // console.log(html)

    res.status(200);
    res.send(html);
    
  });

  
  // console.log(posts)

  // return html;
}

// get request to /test -> index page
app.get('/*', (req,res) => {  
  // build page
  // let page = get_page('index');  
  // res.status(200);  
  // res.send(page);    
  console.log(req.url);

  if (req.url == '/all') {
    console.log('got here!');    
    let posts = get_posts(res);
  
    return;
  }

  if (req.url == '/') {
    console.log('got here!');    
    let page = get_page('index');  
    res.status(200);  
    res.send(page[1]);   
    return;
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

