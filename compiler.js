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

// key-value list with group name and list of posts
let groups = {};

// key-value list with posts and HTML
let posts = {};






// apply templates
// -> takes in post metadata and Marked content generates HTML with header

function generateHTML(meta_obj, post_content) {

  // get metadata fields
  let title = meta_obj["title"];
  let templates = meta_obj["templates"];
  let post_groups = meta_obj["groups"];
  let date = meta_obj["date"];

  let post_html = '';

  // adding post header with date and groups
  if (!templates.includes('github-fetch.md') && !templates.includes('ignore')) {

    // add post title
    post_html += marked('# ' + title);  // add title
    post_html += marked('\n---\n');     // horizontal row  
    post_html += '<div class="header">' // header

    // add post date
    post_html += '<div class="date">Published on ' + date.getFullYear() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate() + '</div>';

    // add post groups
    post_html += '<div class="groups">Groups: '

    for (let i = 0; i < post_groups.length; i++) {
      let g = post_groups[i];
      post_html += `<a href="/${g}">${g}</a>`;
      if (i < post_groups.length-1) {
        post_html += ', '
      }
    }
    post_html += '</div>'               // close "groups" div
    post_html += '</div>'               // close "header" div
    post_html += post_content;

  }

  if (templates.includes('ignore')) {
    post_html = post_content;
  }
  
  if (templates.includes('github-fetch.md')) {
         
    // load template file
    let t = fs.readFileSync(__dirname + '/public/templates/github-fetch.md').toString();

    // formatting URLs
    let github_url = meta_obj["github-url"].toString();
    let mini_url = github_url.slice(19);
    
    // replace placeholders
    t = t.replace('FULLURL', github_url)
          .replace('MINIURL', mini_url)
          .replace(/readme/g, mini_url)
          .replace(/repo-link/g, github_url)      
          
    post_html += t;        
    
  }

  return post_html;
}









// apply templates
// -> gets post metadata and content and adds templates to generate final HTML

function apply_templates(meta_obj, post_HTML, load_base=true) {

  let templates = meta_obj["templates"];  

  // adding base HTML, base CSS and Prism
  let html = fs.readFileSync(__dirname + '/public/templates/base.html').toString();
  let css = '<link rel="stylesheet" href="http://34.200.98.64:3000/templates/base.css">';
  css += '\n<link rel="stylesheet" href="http://34.200.98.64:3000/templates/prism.css">'

  // building page content 
  let content = '';  
  content += post_HTML;

  // looping over templates
  templates.forEach(t_name => {

    // get template file extension
    let t_ext = t_name.substr(t_name.substr(1, t_name.length).indexOf('.')+1); 

    // CSS templates
    if (t_ext == ".css"){
      // link to stylesheet: <link rel="stylesheet" href="http://localhost:3000//templates/base.css">
      css += '\n<link rel="stylesheet" href="http://34.200.98.64:3000/templates/' + t_name + '">'
    }
      
  });

  // apply final CSS and content to base HTML
  html = html.replace('CSS_TEMPLATE', css);
  html = html.replace('CONTENTGOESHERE', content);
  
  return html;
}







// get_data
// -> taks in file_name and returns metadata and post_content

function get_data(file_name) {

  try {    
    // load markdown file
    let file = fs.readFileSync(__dirname + '/public/posts/' + file_name).toString();    

    // split file, get YAML metadata, get Markdown content and convert it to HTML
    let index = file.substr(3, file.length).indexOf('---');
    let yaml_meta = yaml.load(file.substr(3, index));    
    let post_content = marked(file.substr(index + 6));

    return [yaml_meta, post_content];
  }
  catch (err) {
    console.log('Oopsie:', err);

    let post_content = marked("# 404\n\nSorry, couldn't find what you're looking for.");    

    return [{}, post_content];    
  }

}


function clear_htmls() {

  let path = __dirname + '/public/htmls/';

  let filenames = fs.readdirSync(path);

  filenames.forEach(f => {
    fs.unlinkSync(path + f);
  });
}


// generates web pages for all posts
function generate_post_pages () {
  try {
    let filenames = fs.readdirSync(__dirname + '/public/posts/')
    // console.log(filenames);
  
    filenames.forEach(f => {      

      // get file name, remove extension
      let f_name = f.substr(0,f.substr(1, f.length).indexOf('.')+1);

      // create file path  
      let new_f_name = f_name + '.html';      
      let path = __dirname + '/public/htmls/' + new_f_name;

      // delete current existing HTML
      // fs.unlinkSync(path);
      // console.log('Deleted: ' + new_f_name);
  
      // fetch post metadata and content
      let data = get_data(f);
      // data returns array: [metadata, marked_post_content]                             
  
      // get page with header
      let content_HTML = generateHTML(data[0], data[1]);
      
  
      // add post object to posts
      let post_obj = {
        "name": f_name,
        "meta": data[0],
        "HTML": content_HTML
      }
      posts[f_name] = post_obj;
  
      // get final page with templates
      let html = apply_templates(data[0], content_HTML);  
  
      // update groups object
      let post_groups = data[0]["groups"];       
  
      post_groups.forEach(g => {
        if (!groups.hasOwnProperty(g)) {
          groups[g] = [f_name];
        } else {
          groups[g].push(f_name);
        }
      });
      
          
      
    
      try {
        // fs.unlink();
      } 
      finally {
        // write data to file
        fs.writeFile(path, html, 'UTF-8', (err => {
  
          if (err) {return console.log("Something went wrong:", err);}
  
          console.log('Wrote to:', new_f_name);
        })) 
      }
        
    });    
  }
  
  catch (e) {
    return console.log('Unable to scan directory: ' + e);
  }
}




// generates pages for browsing posts in a specified group
function generate_group_pages() {
  
  // looping over groups, generating group pages
  Object.keys(groups).forEach(g => {

    // build path to appropriate file
    let f_name = g + '.html';
    let path = __dirname + '/public/htmls/' + f_name;

    // delete current existing HTML
    // fs.unlinkSync(path);
    // console.log('Deleted: ' + f_name);

    // list of posts by group
    let p_list = [];
    
    // list of post names by group, fetching posts
    let p_name_list = groups[g];
    p_name_list.forEach(p_name => { p_list.push(posts[p_name]) });

    // sort posts by most recent
    p_list.sort( ( p1, p2 )  => {    
      // get unix timestamps
      let d1 = Date.parse(p1["meta"]["date"])/1000;
      let d2 = Date.parse(p2["meta"]["date"])/1000;    

      if (d1 < d2) { return  1; }
      if (d1 > d2) { return -1; }
      return 0;
    });


    // building actual page content
    let content = '';

    // add header with group name
    content += marked('# Group: *' + g.toString() + '* \n --- \n');

    // adding a new div for each post
    p_list.forEach(p => {
      content += marked('[_Read this post in full_](' + '/' + p["name"] + ')');        
      content += '<div class="post">'
      content += p["HTML"];
      content += '</div>'
    });

    // add templates, get final HTML
    let html = apply_templates({"templates": ["group.css"]}, content);

    

    // write data to HTML
    fs.writeFile(path, html, 'UTF-8', (err => {
      if (err) {return console.log("Something went wrong:", err);}
      console.log('Wrote to:', f_name);
    }));

  });
}


// collecting main functions
function main() {
  clear_htmls();
  generate_post_pages();
  generate_group_pages();
}


// run script
main();