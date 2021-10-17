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






// generate HTML
// -> takes in post metadata and Marked content, generates HTML with header

function generateHTML(meta_obj, post_content) {

  // console.log('here is metaobj:', post_content);

  if (meta_obj === undefined) {return console.error('ERROR: Post without metadata!!!')}

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

    // add post date
    // post_html += marked('\n---\n');     // horizontal row  
    post_html += '<div class="header">' // header

    post_html += '<div class="date">Written by <a class="author" href="/me">Lucca</a> on ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate() + ', ' + date.getFullYear() + '</div>';
  
    // add post groups
    // post_html += '<div class="groups">Groups: '
    post_html += '<div class="groups">'

    for (let i = 0; i < post_groups.length; i++) {
      let g = post_groups[i];
      // post_html += `<a href="/${g}">${g}</a>`;
      post_html += `<a href="${g}"> <div class="group-link"> ${g} </div> </a>`;
      // if (i < post_groups.length-1) {
      //   // post_html += ', '
      // }
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

function apply_templates(meta_obj, post_HTML, server) {

  let templates = meta_obj["templates"];  

  // adding base HTML
  let html = fs.readFileSync(__dirname + '/public/templates/base.html').toString();
  
  // adding base CSS + extra CSS
  let css = '';
  css += '<link rel="stylesheet" href="http://'+ server +'/templates/base.css">';
  css += '\n<link rel="stylesheet" href="http://'+ server +'/templates/prism.css">';

  // adding Prism JS + navbar.js
  let js = '';
  js += '<script src="' + 'http://' + server + '/scripts/prism.js"' + '></script>'; // prism.js  
  js += '<script src="' + 'http://' + server + '/scripts/navbar.js"' + '></script>'; // navbar.js
  

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
      css += '\n<link rel="stylesheet" href="http://' + server + '/templates/' + t_name + '">'
    }
      
  });

  // apply final CSS and content to base HTML
  html = html.replace('$CSS', css);
  html = html.replace('$JS', js)
  html = html.replace('$CONTENTGOESHERE', content);

  const regex = /_*\[*\]*\(*\)*\**/g;
  
  let title = "";
  // Add title
  try {
    title = meta_obj["title"];
    title = title.toString().replace(regex, '');
  }
  catch (e) {
    console.log("WARNING - No find description for a post!");
  }
  finally {
    html = html.replace(/\$TITLE/g, title);
  }
  

  // Add meta description tag

  let description = '';
  
  try {
    description = meta_obj["description"];
    description = description.toString().replace(regex, '');
  }
  catch (e) {
    console.log("WARNING - No find description for post: " + meta_obj['title']);
  }
  finally {
    html = html.replace(/\$DESCRIPTION/g, description);
  }

  // Add meta post URL

  let url = '';
  
  try {
    url = meta_obj["file_name"].slice(0, url.length-3);
    url = url.toString().replace(regex, '');
  }
  catch (e) {
    console.log("WARNING - No find URL for post: " + meta_obj['title']);
  }
  finally {
    html = html.replace(/\$URL/g, 'http://' + server + '/' + url);
  } 

  // Add meta post URL

  let img_src = '';
  
  try {
    img_src = meta_obj["img-preview"];
    img_src = img_src.toString().replace(regex, '');
  }
  catch (e) {
    console.log("WARNING - No find IMG-SRC for post: " + meta_obj['title']);
  }
  finally {
    html = html.replace(/\$IMAGE/g, img_src);
  } 
  
  return html;
}










// get_data
// -> takes in file_name and returns metadata and post_content

function get_data(file_name) {

  try {    
    // load markdown file
    let file = fs.readFileSync(__dirname + '/public/posts/' + file_name).toString();    

    // split file, get YAML metadata, get Markdown content and convert it to HTML
    let index = file.substr(3, file.length).indexOf('---');
    let yaml_meta = yaml.load(file.substr(3, index)); 
    yaml_meta.file_name = file_name;   
    let post_content = marked(file.substr(index + 6));

    return [yaml_meta, post_content];
  }
  catch (err) {
    console.error(err);

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
function generate_post_pages (server) {
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
      let html = apply_templates(data[0], content_HTML, server);  
  
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
    // return console.log('Unable to scan directory: ' + e);
    return console.error(e);
  }
}




// generates pages for browsing posts in a specified group
function generate_group_pages(server) {
  
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
      content += '<div class="post">'

      // generate preview content
      let preview_content = '';



      // display album description
      let description = "";

      try {
        description = marked(p["meta"]["description"]);
      }
      catch (e){ 
        console.log("WARNING: Couldn't find description for post", p["name"]);
      }
      finally {
        //content += generateHTML(p["meta"], description + album_embed);
        preview_content += description;
      }


      // display album embed code
      let album_embed = "";

      try {
        album_embed = marked(p["meta"]["album-embed"]);
        console.log("NOTE: Found album-embed for post", p["name"]);
      }
      catch (e){         
      }
      finally {
        //content += generateHTML(p["meta"], description + album_embed);
        preview_content += album_embed;
      }

      // display album embed code
      let img_preview = "";

      try {
        // img_preview = marked(p["meta"]["img-preview"]);
        img_src = p["meta"]["img-preview"]

        if (img_src != undefined) { 
          img_preview = '<img src="' + img_src + '" alt="">' 
          console.log("NOTE: Found img-preview for post", p["name"]);
        }
        
      }
      catch (e){         
      }
      finally {
        //content += generateHTML(p["meta"], description + album_embed);
        preview_content += img_preview;
      }

      content += generateHTML(p["meta"], preview_content);        
      content += '<div class="read-more"> <p> <a href="/' + p["name"] + '">Read More</a> </p> </div>';
      content += '</div>'
      content += '<br>'
      
    });

    // add templates, get final HTML
    // g_name = g.toString().replaceAll(/_*\[*\]*\(*\)*\**/, '');
    let html = apply_templates({"templates": ["group.css"], "title": "Group: " + g.toString(), "description": "View Lucca's posts in the " + g.toString() + " group."}, content, server);

    // write data to HTML
    fs.writeFile(path, html, 'UTF-8', (err => {
      if (err) {return console.log("Something went wrong:", err);}
      console.log('Wrote to:', f_name);
    }));

  });
}


// Gets CLI arguments

function get_arg() {
  let arg = process.argv.slice(2, 3);

  if (arg.length == 0) {
    console.log('Empty argument!');
    // Nginx not configured yet
    // return 'localhost:' + port.toString();
    // Nginx already configured
    return 'localhost'
  } else {
    return arg.toString();
  }

} 


// collecting main functions
function main() {  
  let server = get_arg();
  clear_htmls();
  generate_post_pages(server);
  generate_group_pages(server);
}


// run script
main();