export const state = () => ({
  on: false,
  message: {
    title: '',
    gesture: ''
  },
  maxSeconds: 180,
  minSeconds: 0,
  remainingSeconds: 180,
  timeOut: false,
  answers: [],
  reducedSelectedOdds: [],
  score: 0,
  lives: 3,
  noLife: false,
  tableMin: 25,
  answer: 0,
  increment: 5,
  odd: {
    value: 3/2,
    text: '3/2'
  },
  stack: 20,
  denoms: [
    {
      index: 0,
      value: 1,
      color: '#c0c0c0',
      //color code instead of name pls
      max: 5,
      amount: 0
    },
    {
      index: 1,
      value: 2.5,
      color: '#ff7fb9',
      max: 4,
      amount: 0
    },
    {
      index: 2,
      value: 5,
      color: '#dc3545',
      max: 5,
      amount: 0
    },
    {
      index: 3,
      value: 25,
      color: '#28a745',
      max: 4,
      amount: 0
    },
    {
      index: 4,
      value: 100,
      color: '#343a40',
      max: 5,
      amount: 0
    },
    {
      index: 5,
      value: 500,
      color: '#6f42c1',
      max: 5,
      amount: 0
    },
    {
      index: 6,
      value: 1000,
      color: '#F0E68C',
      textColor: '#343a40',
      max: 5,
      amount: 0
    },
  ],
  odds: [
    {
      value: 1.5,
      text: '3/2',
      active: true,
      tableMin: 25
    },
    {
      value: 3,
      text: '3/1',
      active: false,
      tableMin: 25
    },
    {
      value: 5,
      text: '5/1',
      active: false,
    },
    {
      value: 8,
      text: '8/1',
      active: false,
    },
    {
      value: 11,
      text: '11/1',
      tableMin: 5,
      active: false,
    },
    {
      value: 12,
      text: '12/1',
      tableMin: 5,
      active: false,
    },
    {
      value: 15,
      text: '15/1',
      tableMin: 5,
      active: false,
    },
    {
      value: 17,
      text: '17/1',
      active: false,
    },
    {
      value: 35,
      text: '35/1',
      active: false,
    },
    {
      value: 0.05,
      text: '5%',
      active: false,
      tableMin: 35
    },
    {
      value: 0.95,
      text: '95%',
      active: false,
      tableMin: 35
    },
  ],
  increments: [
    { value: '.5', text: '.5' },
    { value: '1', text: '1' },
    { value: '5', text: '5' },
    { value: '25', text: '25'},
  ],
})

export const mutations = {
  countDown(state){
    state.remainingSeconds--;
    if(state.remainingSeconds <= state.minSeconds){
      state.timeOut = true;
      state.message = {
        title: "Time Out!",
        gesture: "Tik tik tik"
      }
    }
  },
  setTableMin(state, tableMin){
    state.tableMin = tableMin;
  },
  resetTimer(state){
    state.remainingSeconds = state.maxSeconds;
    state.timeOut = false;
  },
  setAnswer(state, answer) {
    state.answer = answer;
  },
  addAnswer(state, answer) {
    state.answers.push(answer)
  },
  setOdds(state, reducedSelectedOdds){
    state.reducedSelectedOdds = reducedSelectedOdds
  },
  setMessage(state, message){
    state.message = message;
  },
  scoreUp(state) {
    state.score++
  },
  resetScore(state){
    state.score = 0;
  },
  lifeDown(state) {     
    state.lives--
    if(state.lives === 0){
      state.noLife = true,
      state.message = {
        title: "Too Many!",
        gesture: "¯\\_(ツ)_/¯"
      }
      state.on = false;
      return
    }
  },
  startGame(state) {
    state.on = true;
    state.lives = 3;
    state.noLife = false;
  },
  endGame(state) {
    state.on = false;
  },
  clearAnswers(state){
    state.answers = [];
  },
  setIncrement(state, increment){
    state.increment = increment;
  }
}