import firebase from '~/plugins/firebase.js'

export default ({ route, redirect }) => {
  if (['/', '/Register'].includes(route.path)) {
    return
  }

  firebase.auth().onAuthStateChanged(user => {
    if (!user) redirect('/')
  })
}