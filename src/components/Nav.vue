<template>
  <div class="topbar">

    <div class="title">
      <router-link to="/"><b>The Lucca Logs</b> 🚀</router-link>
    </div>
    <br>
    <div class="button" @click="$emit('toggle-nav-menu')">
      <button>📄</button>
    </div>

  </div>

  <div class="topbar-menu" id="topbar-menu" v-show="show" @click="$emit('nav-menu-click')">

    <div class="topbar-menu-item">
      <router-link to="/groups/all"><b>📝 All posts</b></router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/programming"><b>👨‍💻 Programming</b></router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/projects"><b>🏗 Projects</b></router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/games"><b>🎮 Games</b></router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/webdesign"><b>🖥 Webdesign</b></router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/github-readme"><b>📚 GitHub READMEs</b></router-link>
    </div>

  </div>

</template>

<script>
export default {
  name: 'Nav',

  data(){
    return {
      // showMenu: false,
    }
  },
  props: {
    'show': Boolean
  },
  emits: ['toggle-nav-menu', 'nav-menu-click']
}
</script>
