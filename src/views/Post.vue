<template>
  <div id="main">

    <!-- post title -->
    <h1 v-html="title" class="title" v-if="!templates.includes('ignore')"></h1>

    <!-- post author and date -->
    <div class="date" v-if="!templates.includes('ignore')">
      Written by <router-link class="author" to="/posts/me">Lucca</router-link> on {{fetch_date}}
    </div>

    <!-- list of post groups -->
    <div class="groups" v-if="!templates.includes('ignore')">
      <router-link v-for="group in groups" :key="group" :to="'/groups/' + group">
        <div class="group-link"> {{group}} </div> 
      </router-link>
    </div>

    <!-- post content -->
    <span v-html="html" class="content"></span>    
    
  </div>
</template>

<script>

const yaml = require('js-yaml');
const marked = require('marked');

export default {
  name: 'Post',

  data() {
    return {
      post_path: '',
      title: '',
      date: '',
      groups: [],
      templates: [],
      html: '',
    }
  },

  methods: {
    // split file, return YAML metadata, get Markdown content and convert it to HTML
    get_data(file){
      let index = file.substr(3, file.length).indexOf('---');
      let yaml_meta = yaml.load(file.substr(3, index)); 
      let post_content = marked(file.substr(index + 6));

      return [yaml_meta, post_content];
    },

    async fetch_post(){

      console.log(this.$route.fullPath);

      if (this.$route.fullPath == '/') {
        this.post_path = 'index';
      } else {
        this.post_path = this.$route.params.name;
      }
      
      const response = await fetch('/posts/' + this.post_path + '.md');
      const md = await response.text();    

      // parse YAML frontmatter
      const [ meta, html ] = this.get_data(md);

      // update data
      this.html = html;
      this.title = marked.parse('# ' + meta.title);
      this.date = new Date(meta.date);
      this.groups = meta.groups;
      this.templates = meta.templates;

      // update author
      // post_html += '<div class="date">Written by <a class="author" href="/me">Lucca</a> on ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate() + ', ' + date.getFullYear() + '</div>';

      console.log(meta);
      // console.log(meta.date.getDate());   
    }
  },

  computed: {
    fetch_date(){
      const date = this.date;
      return date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + ", " + date.getFullYear();
    }
  },

  created() {
    this.fetch_post();
    console.log('Loaded Post component');
  },

  watch: {
    $route: function(){
      console.log('Post path changed!');
      this.fetch_post();
      
    }
  }

}
</script>

<style scoped>
  #content {
    width: 80%;
  }
</style>
