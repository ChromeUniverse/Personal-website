<template>
  <div class="topbar">

    <div class="title">
      <router-link to="/" @click="$emit('nav-menu-click')">
        <b>The Lucca Logs</b> 🚀
      </router-link>
    </div>

    <br>

    <div class="button" @click="$emit('toggle-nav-menu')">
      <button>📝</button>
    </div>

  </div>

  <div class="topbar-menu" id="topbar-menu" v-show="show">

    <div class="topbar-menu-item">
      <router-link to="/groups/all" @click="$emit('nav-menu-click')">
        <b>📝 All Posts</b>
      </router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/programming" @click="$emit('nav-menu-click')">
        <b>👨‍💻 Programming</b>
      </router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/projects" @click="$emit('nav-menu-click')">
        <b>🏗 Projects</b>
      </router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/games" @click="$emit('nav-menu-click')">
        <b>🎮 Games</b>
      </router-link>
    </div>

    <div class="topbar-menu-item">
      <router-link to="/groups/web%20design" @click="$emit('nav-menu-click')">
        <b>🖥 Web Design</b>
      </router-link>
    </div>

    <!-- <div class="topbar-menu-item">
      <router-link to="#goals" @click="$emit('nav-menu-click')">
        <b>Testing!</b>
      </router-link>
    </div> -->

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


<style>

.title {
  letter-spacing: -0.05em;
}

.topbar-menu-item b {
  font-family: 'Noto Sans Display';
  font-weight: normal;
}

</style>