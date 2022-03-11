export const strict = false;

export const state = () => ({
  counter: 0,
  curtain: true
});

export const mutations = {
  increment(state) {
    state.counter++;
  },
  toggleCurtain(state) {
    state.curtain = !state.curtain;
  }
};
