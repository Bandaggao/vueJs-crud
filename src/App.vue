<template>
  <div id="app">
    <div id="nav">
      <qNavbar></qNavbar>
      <!-- <router-view/> -->
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
import qNavbar from './components/nav/Navbar.vue'

export default {
  components: {
    qNavbar
  }
}
</script>>
