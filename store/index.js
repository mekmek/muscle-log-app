export const state = () => ({
  errorMsg: ''
})

export const mutations = {
  updateErrorMsg: (state, msg) => state.errorMsg = msg
}

export const getters = {
  errorMsg: (state) => state.errorMsg
}

export const actions = {
  ciUpdateErrorMsg: (context, msg) => context.commit('updateErrorMsg', msg)
}