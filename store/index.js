export const strict = false

export const state = () => ({
  counter: 0,
  curtain: false
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  toggleCurtain(state){
    state.curtain=!state.curtain
  }
}