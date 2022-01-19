<template>

  <div class="content">

    <!-- Show current group being browsed -->
    <h1> Group: <i> {{ group_path }} </i> </h1>

    <!-- Making post previews: iterating through metadata objects list -->
    <div class="post" v-for="meta in meta_list" :key="meta">
      
      <h2 v-html="meta.title"></h2>
      <p v-html="meta.description"></p>

      <img 
        v-if="meta.hasOwnProperty('img-preview')" 
        :src="meta['img-preview']"
      >

      <div class="read-more"> 
        <router-link :to=" '/' + meta.link ">
          Read More
        </router-link> 
      </div>

    </div>

  </div>    
  
</template>

<script>

const marked = require('marked');
import routes_json from '@/assets/routes.json';

export default {
  name: 'Group',
  data(){
    return {
      routes: routes_json,
      group_path: '',
      meta_list: []
    }
  },
  methods: {

    // fetches all post previews for current group 
    fetch_posts(){
      try {
        this.group_path = this.$route.params.group;
      
        // get list of links
        const groups = routes_json.groups;

        if (!Object.keys(groups).includes(this.group_path)) { 
          // return this.$router.push('/404');
          return;
        }

        const links = groups[this.group_path];

        // fetching post previews for each link
        for (const link of links) {

          const meta = this.routes.posts[link].meta;

          meta.title = marked(meta.title);
          meta.description = marked(meta.description);
          meta.link = link;

          this.meta_list.push(meta); 
        }
      } catch (err) {
        console.error('BIG POOPIE DETECTED', err);
      }

    }
  },

  created() {
    // fetch links on page load
    this.fetch_posts();
  },

  watch: {
    $route: function(){
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