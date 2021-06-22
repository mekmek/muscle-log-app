<template>
  <div class="container alert alert-danger" v-if="msg">
    {{ msg }}
  </div>
</template>

<script>
export default {
  computed: {
    msg() {
      return this.$store.getters.errorMsg
    }
  }
}
</script>

<style scoped>
div {
  margin-top: 10px;
}
</style>