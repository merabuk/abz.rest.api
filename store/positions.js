export const state = () => ({
  positions: []
})

export const mutations = {
  setPositions (state, data) {
    state.positions = data
  }
}
