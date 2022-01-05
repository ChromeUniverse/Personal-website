<template>
  <Nav />
  <router-view/>
  <Footer />
</template>

<script>

import Footer from './components/Footer.vue'
import Nav from './components/Nav.vue'

export default {

  name: 'App',
  components: {
    Nav, Footer
  }
  
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Bakbak+One&family=Noto+Sans+Display:ital@0;1&family=Recursive:wght@700&display=swap');

:root {
  --bg-color: #3D405B;
  --popup-color: rgb(0, 0, 0, 0.1);
  --dark-popup-color: rgb(0, 0, 0, 0.15);

  --main-font: 'Noto Sans Display';
  --h-tag-font: 'Recursive';
  --font-color:#F4F1DE;
  --italics-color: #a5a28b;

  --link-color: #F2CC8F;
  --link-active-color: #E07A5F;

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

#app{
  padding: 0px;
  width: 100%;
  /* text */
  font-family: var(--main-font), sans-serif;
  font-size: 1.1em;
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

.topbar, .topbar-menu {
  /* padding-top: 10px; */
  display: flex;
}

#main {

  /* size */
  max-width: 800px;  

  /* overflow */
  overflow-wrap: break-word;
  overflow-y: overlay;
  overflow-x: overlay;

  /* flexbox */
  display: flex;
  flex-direction: column;
  align-items: center;
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

.content h1{
  font-size: 2em;
}

hr {
  border: 2px solid var(--font-color);
  border-radius: 2px;
  background-color: var(--font-color);
}

h1, h2, h3, h4, h5 {
  font-family: var(--h-tag-font), sans-serif;
}

h1 {
  display: block;
  font-size: 1.5em;
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

footer p{
  margin: 0px;
}


a {
  text-decoration: none;
}

/* unvisited link */
a:link, a:visited {
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
  max-width: 80%;
  background: var(--img-border-color);
  padding: 3px;
  max-height: 300px;
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

.date, .groups {
  /* font-style: italic; */
  color: var(--italics-color);
  padding: 0px;
}

.date {
  margin: auto;
  margin-bottom: 15px;
}

.groups{
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

.date a:link, .date a:visited {
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
  max-width: 800px;
  
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
.topbar .title a:link, .topbar .title a:visited {
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
  max-width: 800px;

  background-color: var(--dark-popup-color);
  border-radius: 5px;
  overflow-x: auto;
}

.img-caption {
  margin: 0px;
  text-align: center;
  color: var(--italics-color);
}

.spotify {
  margin:auto;
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

@media screen and (max-width: 790px) {

  .master-div{
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
}

</style>
