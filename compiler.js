const fs = require('fs');
const yaml = require('js-yaml');

const path = './posts/';

// extracts YAML metadata from file
function get_data(file) {
  let index = file.substr(3, file.length).indexOf('---');
  let yaml_meta = yaml.load(file.substr(3, index)); 
  let post_content = file.substr(index + 6);
  return [yaml_meta, post_content];
}

// main function -> builds routes JSON
function main() {

  try {

    // empty routes object
    let routes = {
      posts: {},
      groups: {}
    }; 

    // read posts directory
    const file_names = fs.readdirSync(path);

    // loop over files 
    for (const file_name of file_names) {

      // add to list of posts
      const file_route = file_name.slice(0, file_name.length - 3);

      // read file
      const file = fs.readFileSync(path + file_name).toString();
    
      // get YAML metadata 
      const [meta, md] = get_data(file);
      
      routes.posts[file_route] = {
        meta: meta,
        md: md
      };

      // find groups from each post
      const groups = meta.groups;
      
      // loop over groups
      for (const group of groups) {

        // check if groups has current group -> initialize empty array
        if (!routes.groups.hasOwnProperty(group)) routes.groups[group] = [];

        // push new current post to group list
        routes.groups[group].push(file_route);
      }
    }

    // sorting posts in groups by descending date
    for (const group_name of Object.keys(routes.groups)) {

      const post_names_list = routes.groups[group_name];

      // sorting function
      post_names_list.sort((p1, p2) => {
        const date1 = new Date(routes.posts[p1].meta.date).getTime() / 1000;
        const date2 = new Date(routes.posts[p2].meta.date).getTime() / 1000;
        return date2 - date1;
      });
      
    }

    // convert object to JSON, write to file
    routes = JSON.stringify(routes);
    fs.writeFileSync(__dirname + '/src/assets/routes.json', routes);
    

  } catch(err) {
    console.log('Yo yo yo, something went wrong!');
    console.error(err);
  }

}

// run program
main();