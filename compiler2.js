const fs = require('fs');
const yaml = require('js-yaml');

const path = './public/posts/';


// extracts YAML metadata from file
function get_data(file) {
  let index = file.substr(3, file.length).indexOf('---');
  let yaml_meta = yaml.load(file.substr(3, index)); 
  return yaml_meta;
}

// main function -> builds routes JSON
function main() {

  // empty routes object
  let routes = {
    posts: [],
    groups: {}
  }; 

  // read posts directory
  const file_names = fs.readdirSync(path);

  // console.log(file_names_no_ext);

  // routes.posts = file

  // loop over files 
  for (const file_name of file_names) {

    // add to list of posts
    const file_route = file_name.slice(0, file_name.length - 3);
    routes.posts.push(file_route);

    // read file
    const file = fs.readFileSync(path + file_name).toString();
  
    // get YAML metadata 
    const meta = get_data(file);
    // console.log(meta);

    // find groups from each post
    const groups = meta.groups;
    
    // loop over groups
    for (const group of groups) {
      // check if groups has current group -> initialize empty array
      if (!routes.groups.hasOwnProperty(group)) {
        routes.groups[group] = [];
      }
      // push new current post to group list
      routes.groups[group].push(file_route);
    }

  }

  routes = JSON.stringify(routes);

  console.log(routes);

  fs.writeFileSync(__dirname + '/public/routes.json', routes);
 
}

// run program
main();