<template>
  <div class="component">
  </div>
</template>

<script>
import { ComponentComp } from "./index";
export default {
  name: 'Component',
  data() {
    return {
      uid: '',
      component: new ComponentComp(this.uid)
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
