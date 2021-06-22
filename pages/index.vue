<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <h5>メールアドレスでログイン</h5>
          <input type="text" class="form-control" placeholder="メールアドレス" v-model="email">
          <input type="password" class="form-control" placeholder="パスワード" v-model="password">
          <button class="btn btn-primary" @click="login">ログイン</button>
          <hr>
          <nuxt-link to="/Register">新規登録はこちら</nuxt-link>
        </div>
        <div class="col-md">
          <h5>SNSでログイン/新規登録</h5>
          <button class="btn btn-outline-primary" @click="snsLogin('twitter')">
            <img src="~/assets/images/twitter.svg">Twitter
          </button>
          <button class="btn btn-outline-info" @click="snsLogin('facebook')">
            <img src="~/assets/images/facebook.svg">Facebook
          </button>
          <button class="btn btn-outline-secondary" @click="snsLogin('google')">
            <img src="~/assets/images/google-icon.svg">Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const redirected = this.$route.query.redirected
    if (redirected === 'noCredential') this.$store.dispatch('ciUpdateErrorMsg', 'ログインが必要です')
    if (redirected === 'logout') this.$store.dispatch('ciUpdateErrorMsg', 'ログアウトしました')
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('users/login', {
        email: this.email,
        password: this.password
      })
    },
    snsLogin(provider) {
      this.$store.dispatch('users/snsLogin', { value: provider })
    }
  }
}
</script>

<style scoped>
.row {
  background-color: whitesmoke;
  margin-top: 100px;
}

.col-md {
  padding: 40px;
  text-align: center;
}

h5 {
  text-align: center;
  margin-bottom: 30px;
}

button {
  display: block;
  width: 100%;
  margin-bottom: 15px;
}

input {
  margin-bottom: 15px;
}

img {
  height: 20px;
  margin-right: 5px;
}
</style>
