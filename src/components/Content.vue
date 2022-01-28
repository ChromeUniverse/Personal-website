// Content.vue
<template>
  <div id="customContentComponent" v-html="htmlContent"></div>    
</template>

<script>

// 

// CustomContent.vue

import Vue from "vue"
// let Vue = require('vue') 

// import { component } from 'vue'

// import { resolveComponent, defineComponent } from 'vue'
// import RouterLink from '@/components/Router-Link.vue'

export default {
  props: {
    htmlContent: {
      type: String,
      required: true,
    },
  },
  // render(createElement) {
  //   // https://vuejs.org/v2/guide/render-function.html#createElement-Arguments
  //   const options = {
  //     domProps: { innerHTML: this.htmlContent },
  //   };
  //   return createElement("div", options);
  // },
  mounted() {
    const anchors = this.$el.getElementsByTagName("a"); // Not iterable

    // console.log(this.$el);

    Array.from(anchors).forEach((anchor) => {
      const url = anchor.getAttribute("href");      
      
      // Skip external links
      if (url.startsWith("http")) return;
      if (url.startsWith("mailto")) return;

      console.log('Got anchor tag with URL:', url);

      // const path = url.replace("https://example.com", "");
      
      // https://vuejs.org/v2/api/#propsData
      const propsData = { to: url };      
      
      // https://vuejs.org/v2/api/#parent
      // Without parent context RouterLink will be unable to access this.$router, etc.
      const parent = this;

      // console.log(Vue.component);
      
      // const RouterLink = new component('RouterLink')
      // const RouterLink = resolveComponent("RouterLink");
      // console.log(RouterLink);
      // const routerLink = RouterLink({ propsData, parent });
      // routerLink.$el.innerHTML = anchor.innerHTML;
      // routerLink.$mount(anchor); // Replaces anchor element
      const RouterLink = Vue.component('RouterLink')
      const routerLink = new RouterLink({ propsData, parent })
      routerLink.$el.innerHTML = anchor.innerHTML
      routerLink.$mount(anchor) // Replaces anchor element

    });
  },
}
</script>

<style>

#customContentComponent {
  border: 5px solid red;
}


</style>
