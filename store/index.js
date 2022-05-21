export const state = () => ({
  message: 'Loading ...'
})

export const mutations = {
  setMessage (state, text) {
    state.message = text
  }
}
