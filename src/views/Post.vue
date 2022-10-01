<template>

  <div id="main">

    <!-- post title -->
    <div v-html="title" class="title" v-if="!templates.includes('ignore')"></div>

    <!-- post author and date -->
    <div class="date" v-if="!templates.includes('ignore')">
      Written by <router-link class="author" to="/me">Lucca</router-link> on {{fetch_date}}
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

const marked = require('marked')
import routes_json from '@/assets/routes.json'

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
      routes: routes_json
    }
  },

  methods: {
 
    fetch_post(){

      this.post_path = this.$route.params.post;

      // serve index page on website root
      if (this.$route.fullPath == '/') this.post_path = 'index';
      
      // check if post exists
      if (!Object.keys(this.routes.posts).includes(this.post_path)) this.post_path = "404"; 

      // get metadata and post content
      const post = this.routes.posts[this.post_path];
      const meta = post.meta;
      const md = post.md;

      // update data
      this.html = marked(md);
      this.title = marked('# ' + meta.title);
      this.date = new Date(meta.date);
      this.groups = meta.groups;
      this.templates = meta.templates;

      // Highlight code snippets with Prism
      setTimeout(function() {
        Prism.highlightAll();      
      }, 5);
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
  },

  watch: {
    $route: function(){
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
