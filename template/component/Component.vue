<template>
  <div class="component">
  </div>
</template>

<script>
import handle, { component } from "./component";
export default {
  name: 'Component',
  created() {
    handle.created()
  },
  mounted() {
    handle.mounted()
  },
}
</script>

<style>
</style>
