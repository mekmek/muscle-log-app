<template>
  <nav class="navbar bg-primary navbar-dark navbar-expand justify-content-between">
    <a class="navbar-brand" href="/Home">筋トレアプリ（仮）</a>
    <ul class="navbar-nav" v-if="isActive">
      <li class="nav-item"><a class="nav-link" href="#">メディア</a></li>
      <li class="nav-item"><a class="nav-link" href="#">設定</a></li>
      <li class="nav-item"><a class="nav-link" href="#" @click="logout">ログアウト</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    isActive() {
      const exPath = [
        '/',
        '/Register'
      ]
      return !exPath.includes(this.$route.path)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
    }
  }
}
</script>