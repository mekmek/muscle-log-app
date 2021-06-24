import firebase from "~/plugins/firebase"
const db = firebase.firestore()

export const state = () => ({
  trainingItems: []
})

export const mutations = {
  updateTrainingItems: (state, payload) => state.trainingItems = payload
}

export const getters = {
  trainingItems: (state) => state.trainingItems
}

export const actions = {
  // トレーニング種目の新規登録
  async registerTraining(context, payload) {
    const name = payload.name
    const part = payload.part
    const group = payload.group
    const memo = payload.memo
    const uid = context.getters['users/uid']

    try {
      if (!payload.name) throw new Error('種目名を入力してください')

      const tRef = db.collection('users').doc(uid).
                      collection('training-items').doc()
      await tRef.set({
        name,
        part,
        group,
        memo
      })

    } catch(e) {
      context.commit('updateErrorMsg', e.message, { root: true })
    }
  },

  // リスナー
  async listenTrainingItems(context) {
    const uid = context.getters['users/uid']
    const cRef = db.collection('users').doc(uid).collection('training-items')

    try {
      const querySnapshot = await cRef.onSnapshot
      const items = []
      await querySnapshot.forEach(doc => {
        items.push({
          name: doc.data().name,
          part: doc.data().part,
          group: doc.data().group,
          memo: doc.data().memo
        })
      })
      context.commit('updateTrainingItems', items)

    } catch(e) {
      context.commit('updateErrorMsg', e.message, { root: true })
    }
  }
}