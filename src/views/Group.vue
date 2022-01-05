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
      <router-link to="/posts/building-tank-battle">Read More</router-link> 
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

    get_data(file){
      let index = file.substr(3, file.length).indexOf('---');
      let yaml_meta = yaml.load(file.substr(3, index)); 
      let post_content = marked(file.substr(index + 6));

      return [yaml_meta, post_content];
    },

    async fetch_links(){
      this.group_path = this.$route.params.name;

      const response = await fetch('/groups/' + this.group_path + '.json');
      const data = await response.json();
      
      for (const link of data.links) {
        const meta = await this.fetch_meta(link);

        console.log(meta);

        meta.title = marked(meta.title);
        meta.description = marked(meta.description);

        this.meta_list.push(meta); 
      }

    },

    async fetch_meta(path){
      
      const response = await fetch('/posts/' + path + '.md');
      const md = await response.text();    

      // parse YAML frontmatter
      const [ meta, html ] = this.get_data(md);
            
      return meta;
    }
  },
  async created() {
    await this.fetch_links();
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