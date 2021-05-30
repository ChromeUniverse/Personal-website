// express.js setup
const express = require("express");
const app = express();
const port = 3000;
app.use(express.static('public'));

// filesystem
const fs = require("fs");

// marked.js markdown parser
const marked = require("marked");

// yaml parser
const yaml = require('js-yaml');

// post group list
const groups = ['all', 'github-readme', 'music', 'album-review', 'programming'];

// load page with file name
function get_page(file_name, load_base = true) {  

  // load base template
  let html = '';
  let content = '';

  try {
    // load main file   
    file = fs.readFileSync(__dirname + '/public/posts/' + file_name + '.md').toString();

    // get yaml meta data
    let index = file.substr(3, file.length).indexOf('---');
    let yaml_meta = yaml.load(file.substr(3, index));
    // console.log(yaml_meta);

    // get post time 
    let unixtime = Date.parse(yaml_meta["date"])/1000;

    

    // loading post templates
    let templates = yaml_meta["templates"];
    if (!templates.includes('github-fetch.md')) {
      // add post title
      content += marked('# ' + yaml_meta["title"]);  // add title
      content += marked('\n---\n');      
      content += '<div class="header">'

      // add post date
      let date = yaml_meta["date"];
      content += '<div class="date">Published on ' + date.getFullYear() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate() + '</div>';

      // add post groups
      let post_groups = yaml_meta["groups"];
      content += '<div class="groups">Groups: '

      for (let i = 0; i < post_groups.length; i++) {
        let g = post_groups[i];
        content += `<a href="http://localhost:3000/${g}">${g}</a>`;
        if (i < post_groups.length-1) {
          content += ', '
        }
      }
      content += '</div>' // close "groups" div
      content += '</div>' // close "header" div
    }
    
    // get post content
    content += marked(file.substr(index + 6)); 

    
    // console.log(templates);
    templates.forEach(t_name => {

      // check if post requires a GitHub fetch template
      if (t_name = 'github-fetch.md') {  

        // formatting URLs
        let github_url = yaml_meta["github-url"].toString();
        let mini_url = github_url.slice(19);

        // loading and modifying template
        t = fs.readFileSync(__dirname + '/public/templates/' + t_name).toString();
        t = t.replace('FULLURL', github_url)
             .replace('MINIURL', mini_url)
             .replace(/readme/g, mini_url)
             .replace(/repo-link/g, github_url)            

        content += t;        
      } else {
        // adding templates to content
        t = fs.readFileSync(__dirname + '/public/templates/' + t_name).toString();
        content += t;
      }

      content += ''
      
    });

    if (load_base == true) {
      // load base template
      html += fs.readFileSync(__dirname + '/public/templates/base.html').toString();
      // add content to base template
      html = html.replace('CONTENTGOESHERE', content);    
    } else {
      html = content;
    }      
    
    return [true, html, yaml_meta];
  }
  catch (e) {   
    console.log('OOPSIE POOPSIE:', e);
    
    content = marked("# 404\n\nSorry, couldn't find what you're looking for.");

    // base template
    html += fs.readFileSync(__dirname + '/public/templates/base.html').toString();
    // add content to base template
    html = html.replace('CONTENTGOESHERE', content);     

    return [false, html];    
  }   
  
}

// load all posts
function get_posts(res, group) {

  // add base template
  let html = '';
  html += fs.readFileSync(__dirname + '/public/templates/all.html').toString();

  // add header
  content = '';
  content += marked('# Group: *' + group.toString() + '* \n --- \n');

  // load content from all matching files
  fs.readdir(__dirname + '/public/posts/', (err, files) => {
    
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    files.forEach(f => {

      // load post metadata and content
      let post_endpoint = f.substr(0,f.length-3);      
      let post = get_page(post_endpoint, false);   // don't load base template!
      let post_meta = post[2];
      let post_content = post[1];      

      // add only posts from the specified group
      let post_groups = post_meta["groups"];

      if (post_groups.includes(group)) {        
        content += marked('[_Read this post in full_](' + 'http://localhost:' + port + '/' + post_endpoint + ')');
        content += '<div class="post">'
        content += post_content;
        content += '</div>'
      }
      
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
  console.log(req.url);

  let req_endpoint = req.url.substr(1);

  // get posts from group
  if (groups.includes(req_endpoint)) {
    get_posts(res, req_endpoint); 
    return;
  } else {

    // get post

    if (req.url == '/') {
      let page = get_page('index');  
      res.status(200);  
      res.send(page[1]);   
      return;
    }
  
    else {    
      let page = get_page(req_endpoint);      
      if (page[0]) {
        res.status(200);
      } else {
        res.status(404);        
      }
      res.send(page[1]);
    }
  }

  


});

// start server
app.listen(port, () => console.log(`Server started on port: ${port}`));

