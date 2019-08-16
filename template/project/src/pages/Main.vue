<template>
  <div id="Main">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

import HelloWorld from '../components/HelloWorld.vue'
import {mapActions} from 'vuex'
export default {
  name: 'Main',
  data () {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions({
      init: 'main/init'
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
</style>
