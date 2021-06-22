import firebase from '~/plugins/firebase'
import Cookies from 'universal-cookie'
const db = firebase.firestore()

export const state = () => ({
  userName: ''
})

export const mutations = {
  updateUserName(state, user) {
    state.userName = user.userName
  } 
}

export const actions = {
  async register(context, userInfo) {
    const userName = userInfo.userName
    const email = userInfo.email
    const password = userInfo.password
    
    try {
      if (!userName || !email || !password) throw new Error('未入力の項目があります')
      
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = userCredential.user
      await user.updateProfile({ displayName: userName })

      const userRef = db.collection('users').doc(user.uid)
      await userRef.set({
        userName,
        email,
        password,
        comment: '',
        image: ''
      })
      const cookie = new Cookies()
      cookie.set('credential', 'true')
      this.$router.push('/Home')
    
    } catch(e) {
      context.commit('updateErrorMsg', e.message, { root: true })
    }
  },

  async login(context, userInfo) {
    const email = userInfo.email
    const password = userInfo.password
    
    try {
      if (!email || !password) throw new Error('未入力の項目があります')

      await firebase.auth().signInWithEmailAndPassword(email, password)
      const cookie = new Cookies()
      cookie.set('credential', 'true')
      this.$router.push('/Home')

    } catch(e) {
      context.commit('updateErrorMsg', e.message, { root: true })
    }
  },

  async logout(context) {
    try {
      await firebase.auth().signOut()
      const cookie = new Cookies()
      cookie.remove('credential')
      this.$router.push({ path: '/', query: { redirected: 'logout'} })
    } catch(e) {
      context.commit('updateErrorMsg', e.message, { root: true })
    }
  },

  async snsLogin(context, payload) {
    let provider
    switch (payload.value) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider()
        break
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider()
        break
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider()
        break
    }
    
    try {
      const result = await firebase.auth().signInWithPopup(provider)
      const isNewUser = result.additionalUserInfo.isNewUser
      if (isNewUser) {
        const userName = result.user.displayName
        const userRef = db.collection('users').doc()
        await userRef.set({
          userName,
          email: '',
          password: '',
          comment: '',
          image: ''
        })
      }
      const cookie = new Cookies()
      cookie.set('credential', 'true')
      this.$router.push('/Home')
    
    } catch(e) {
      context.commit('updateErrorMsg', e.message, { root: true })
    }
  }
}