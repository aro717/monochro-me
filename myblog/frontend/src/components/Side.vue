<template>
  <nav id="sidebar">

  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'site-sidebar',
  computed: {
    ...mapGetters(['postList'])
  }
}
</script>

<style scoped>
#sidebar {
  width: 160px;
}
</style>
