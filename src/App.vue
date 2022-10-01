<template>
  <Nav
    :show="showNavMenu"
    @toggle-nav-menu="toggleNavMenu"
    @nav-menu-click="closeNavMenu"
  />
  <router-view/>
  <Footer/>
</template>

<script>

// using @ as alias for /src
import Footer from '@/components/Footer.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'App',
  data(){
    return {
      showNavMenu: false,
      routes: {}
    }
  },
  components: {
    Nav, Footer
  },
  methods: {
    toggleNavMenu(){
      this.showNavMenu = !this.showNavMenu;
    },
    closeNavMenu(){
      this.showNavMenu = false;
    }
  },  
  mounted () {

    // special thanks to Dennis Reimann for the code below
    // https://dennisreimann.de/articles/delegating-html-links-to-vue-router.html

    window.addEventListener('click', event => {

      // ensure we use the link, in case the click has been received by a subelement
      let { target } = event      

      while (target && target.tagName !== 'A') target = target.parentNode
      
      // handle only links that do not reference external resources
      if (target && target.matches("a:not([href*='://'])") && target.href && !target.href.includes('mailto')) {

        // some sanity checks taken from vue-router:
        // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
        const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event
        
        // don't handle with control keys
        if (metaKey || altKey || ctrlKey || shiftKey) return
        
        // don't handle when preventDefault called
        if (defaultPrevented) return
        
        // don't handle right clicks
        if (button !== undefined && button !== 0) return
        
        // don't handle if `target="_blank"`
        if (target && target.getAttribute) {
          const linkTarget = target.getAttribute('target')
          if (/\b_blank\b/i.test(linkTarget)) return
        }
        
        // don't handle same page links/anchors
        const url = new URL(target.href);
        let to = url.pathname;

        // handling header anchors
        if (target.href.includes('#')){

          const slash_index = target.href.indexOf('/', 7);
          const path = target.href.substring(slash_index);

          const [ postpath, headeranchor ] = path.split('#');

          if (postpath == '/') to = `${window.location.pathname}#${headeranchor}`;            
          else to = `${postpath}#${headeranchor}`;
         
        }

        // router navigation
        if (window.location.pathname !== to && event.preventDefault) {
          event.preventDefault()
          this.$router.push(to)
        }
      }
    })
  }

}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Recursive:wght@400;700&family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');

:root {
  --bg-color: #3d405b;
  --popup-color: rgb(0, 0, 0, 0.1);
  --dark-popup-color: rgb(0, 0, 0, 0.15);

  --main-font: "Noto Sans Display";
  --h-tag-font: "Recursive";
  --font-color: #f4f1de;
  --italics-color: #a5a28b;

  --link-color: #f2cc8f;
  --link-active-color: #e07a5f;

  --img-border-color: #1f2138;
}

body {
  /* background-color: #3D405B; */
  background-color: var(--bg-color);
  /* background-color: #282c34; */
  /* background-color: #21252b; */
  display: flex;
  flex-direction: column;
  align-items: center;

  color: var(--font-color);
  font-size: 17px;

  width: 100%;
  padding: 0px;
  margin: 0px;

  /* max-width: 800px; */
  /* padding: 10px; */
  /* margin-left: auto; */
  /* margin-right: auto; */
}

div {
  padding: 10px;
}

.master-div {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  width: 800px;
}

#app {
  padding: 0px;
  width: 100%;
  /* text */
  font-family: var(--main-font), sans-serif;
  font-size: 1em;
  line-height: 1.6;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar .header {
  font-family: var(--h-tag-font), sans-serif;
  font-size: 25px;
  text-align: left;
}

.topbar {
  border-radius: 10px;
  margin-top: 10px;
}

.topbar,
.topbar-menu {
  /* padding-top: 10px; */
  display: flex;
}

#main {
  /* size */
  width: 92%;
  max-width: 700px;

  /* overflow */
  overflow-wrap: break-word;
  overflow-y: overlay;
  overflow-x: overlay;

  /* flexbox */
  display: flex;
  flex-direction: column;
}

/* #main span {
  padding-left: 20px;
  padding-right: 20px;
}

#main Footer {
  width: 100%;
}

span .content {
  padding: 0px;
} */

.content h1 {
  font-size: 2em;
}

hr {
  border: 2px solid var(--font-color);
  border-radius: 0px;
  background-color: var(--font-color);
  width: 100%;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: var(--h-tag-font), sans-serif;
  letter-spacing: -0.05em;
}

h1 {
  display: block;
  font-size: 1.4em;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
  margin-right: auto;
  margin-left: auto; 
}

blockquote {
  background-color: var(--popup-color);
  margin: 15px;
  padding: 15px;
  border-radius: 10px;
}

footer {
  text-align: center;
  margin-bottom: 20px;
}

footer p {
  margin: 0px;
}

a {
  text-decoration: none;
}

/* unvisited link */
a:link,
a:visited {
  color: var(--link-color);
}

/* mouse over link */
a:hover {
  color: var(--link-active-color);
}

p {
  margin-top: 15px;
  margin-bottom: 15px;
  /* margin-left: 15px; */
  /* margin-right: 15px; */
}

img {
  display: block;
  margin: auto;
  max-width: 70%;
  background: var(--img-border-color);
  padding: 3px;
  max-height: 350px;
  border-radius: 10px;
  /* height: 200px; */
}

ul {
  padding-left: 20px;
}

.main .header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
}

.date,
.groups {
  /* font-style: italic; */
  color: var(--italics-color);
  padding: 0px;
}

.date {
  margin: auto;
  margin-bottom: 15px;
}

.groups {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.group-link {
  background-color: var(--popup-color);
  margin: 5px;
  padding-top: 2.5px;
  padding-bottom: 5px;
  padding-left: 10px;
  border-radius: 6px;
}

.date a:link,
.date a:visited {
  color: var(--font-color);
  border-bottom: 2px solid var(--link-color);
}

.date a:hover {
  color: var(--link-active-color);
  border-bottom: 2px solid var(--link-active-color);
}

.main .header {
  flex-direction: column;
}

.topbar {
  width: 90%;
  max-width: 700px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  overflow-wrap: break-word;
  background-color: var(--dark-popup-color);
}

.topbar .title {
  color: var(--font-color);
  font-family: var(--h-tag-font), sans-serif;
  padding: 0px;
  font-size: 27px;
  /* text-align: left; */
}

/* unvisited link */
.topbar .title a:link,
.topbar .title a:visited {
  color: var(--font-color);
}

/* mouse over link */
.topbar .title a:hover {
  color: var(--link-active-color);
}

.topbar .title:hover {
  color: var(--link-active-color);
}

.topbar .button {
  width: 40px;
  height: 40px;
  padding: 0px;
}

.topbar button {
  height: 100%;
  width: 100%;
  border-radius: 4px;
  border: none;
  background-color: var(--link-color);
}

/* mouse over link */
.button:active button {
  background-color: var(--link-active-color);
}

.button:active .topbar-menu {
  /* background-color: #E07A5F;    */
  display: flex;
}

.topbar-menu {
  font-family: var(--main-font), sans-serif;
  flex-direction: column;
  justify-content: space-between;

  width: 90%;
  max-width: 700px;

  background-color: var(--dark-popup-color);
  border-radius: 8px;
  overflow-x: auto;
}

.img-caption {
  margin: 0px;
  text-align: center;
  color: var(--italics-color);
}

.spotify {
  margin: auto;
}

.artist-list {
  /* background-color: aqua; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;  
  font-size: 18px;
}

.artist {
  margin: 5px;
  min-width: 100px;
  border-radius: 10px;
  background-color: #353850;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.artist img {
  /* width: 90%; */
  border-radius: 10px;
  /* margin-left: 0; */
  /* margin-right: 0; */
  width: 140px;
  background: transparent;
  /* height: 200px; */
}

.artist h4 {
  margin-top: 5px;
  margin-bottom: 0;
}


::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: var(--font-color);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--italics-color);
}

::-webkit-scrollbar-corner {
  background: transparent;
}

code {
  background-color: #323442;
  padding: 3px 9px;
  border-radius: 1000px;
}

code[class*="language"] {
  padding: 0;
}

pre {
  border-radius: 10px;
}

.title h1 {
  font-size: 2em;
}

@media screen and (max-width: 790px) {

  #app {
    font-size: 1.1em;
  }

  .master-div {
    width: 103%;
  }

  img {
    max-width: 95%;
    max-height: 220px;
    /* height: 200px; */
  }

  .main {
    width: 90%;
  }

  .main .header {
    flex-direction: column;
  }

  .sidebar {
    display: none;
  }

  .title h1 {
    font-size: 1.5em;
  }

}
</style>
