<template>
  <div>
    <div class="container">
      <div class="input-area">
        <h5>メールアドレスで新規登録</h5>
        <div class="form-group row justify-content-center">
          <label class="col-lg-2 col-form-label" for="username">ユーザー名</label>
          <input type="text" class="form-control col-lg-5" placeholder="ユーザー名を入力" id="username" v-model="userName">
        </div>
        <div class="form-group row justify-content-center">
          <label class="col-lg-2 col-form-label" for="email">メールアドレス</label>
          <input type="email" class="form-control col-lg-5" placeholder="メールアドレスを入力" id="email" v-model="email">
        </div>
        <div class="form-group row justify-content-center">
          <label class="col-lg-2 col-form-label" for="password">パスワード</label>
          <input type="password" class="form-control col-lg-5" placeholder="パスワードを入力" id="password" v-model="password">
        </div>
        <button class="btn btn-primary" @click="register">登録</button>
        <hr>
        <nuxt-link to="/">ログインはこちら</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('users/register', {
        userName: this.userName,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.input-area {
  background-color: whitesmoke;
  margin-top: 100px;
  padding: 40px;
  text-align: center;
}

h5 {
  text-align: center;
  margin-bottom: 30px;
}

label {
  text-align: left;
}

button {
  margin-top: 10px;
}
</style>