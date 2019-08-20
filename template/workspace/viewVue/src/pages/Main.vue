<template>
  <div id="Main">
    <Project />
  </div>
</template>

<script>

import Project from '../components/project/Project.vue'
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
    Project
  }
}
</script>

<style>
</style>
