<template>

  <h1> Group: <i> {{ group_path }} </i> </h1>

  <div class="post" v-for="meta in meta_list" :key="meta">
    
    <!-- <h1> {{ meta.title }} </h1> -->
    <h1 v-html="meta.title"></h1>
    <p v-html="meta.description"></p>

    <img 
      v-if="meta.hasOwnProperty('img-preview')" 
      :src="meta['img-preview']
    ">

    <div class="read-more"> 
      <router-link :to=" '/' + meta.link ">
        Read More
      </router-link> 
    </div>

  </div>

</template>

<script>

const yaml = require('js-yaml');
const marked = require('marked');

export default {
  name: 'Group',
  data(){
    return {
      group_path: '',
      meta_list: []
    }
  },
  methods: {

    // parses .md file -> returns YAML metadata and post HTML content
    get_data(file){
      let index = file.substr(3, file.length).indexOf('---');
      let yaml_meta = yaml.load(file.substr(3, index)); 
      let post_content = marked(file.substr(index + 6));

      return [yaml_meta, post_content];
    },

    // fetches metadata for one post -> returns metadata object
    async fetch_meta(path){
      
      const response = await fetch('/posts/' + path + '.md');
      const md = await response.text();    

      // parse YAML frontmatter and post content
      const [ meta, html ] = this.get_data(md);
            
      return meta;
    }, 

    // fetches all post previews for current group 
    async fetch_posts(){
      this.group_path = this.$route.params.name;
      
      // get list of links
      const response = await fetch('/routes.json');
      const data = await response.json();
      const groups = data.groups;
      const links = groups[this.group_path];

      // fetching post previews for each link
      for (const link of links) {
        const meta = await this.fetch_meta(link);
      
        meta.title = marked(meta.title);
        meta.description = marked(meta.description);
        meta.link = link;

        this.meta_list.push(meta); 
      }

    }
  },

  async created() {
    // fetch links on page load
    await this.fetch_posts();
  },

  watch: {
    $route: function(){
      console.log('Group path changed!');
      // reset list of metadata objects
      this.meta_list = [];
      // fetch links once more
      this.fetch_posts();      
    }
  }
}
</script>

<style scoped>
.post {
  margin: auto;
  padding-left: 30px;
  padding-right: 30px;
  width: 80%;
  max-width: 700px;
  /* max-height: 450px; */
  /* overflow: auto; */
  background-color: #353850;
  /* background-color: #282c34; */
  border-radius: 5px;
  text-align: center;

  /* padding-bottom: 10px; */
  margin-bottom: 40px;
}

.read-more {
  padding: 5px;  
  padding-bottom: 10px;
  width: 140px;
  height: 29px;
  margin: 20px auto 10px;
  border-radius: 6px;

  text-align: center;

  font-size: 20px;
  
  /* background-color: #F2CC8F; */
  /* background-color: #F4F1DE; */
  /* background-color: #3D405B; */

  background-color: #2a2f49;
  
}

.read-more :hover {
  color: #E07A5F;
}

.read-more a, .read-more p {
  margin: 0;
  color: #F4F1DE;
  /* color: #F2CC8F; */
  /* color: #3D405B; */
}
</style>