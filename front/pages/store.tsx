import { createStore, action } from 'easy-peasy';

export default createStore({
  variables: [],

  setVariables: action((state, payload) => {
    state.variables = [...payload];
  }),
});
