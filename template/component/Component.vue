<template>
  <div class="component">
  </div>
</template>

<script>
import { Component } from "./index";
export default {
  name: 'Component',
  data() {
    return {
      _uid: '',
      component: new Component(this._uid)
    }
  },
  created() {
    this.component.created()
  },
  mounted() {
    this.component.mounted()
  },
}
</script>

<style>

</style>
