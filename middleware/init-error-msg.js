export default ({ store }) => {
  const errorMsg = store.getters.errorMsg
  if (errorMsg) store.dispatch('ciUpdateErrorMsg', '')
}