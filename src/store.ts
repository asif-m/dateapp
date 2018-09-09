import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
  },
  mutations: {
    initList(state, events: []) {
      state.events = events;
    },
    addEvent(state, event: any) {
      state.events.push(event);
    },
  },
  actions: {
    initList({ commit }, events) {
      commit('initList', events);
    },
    addEvent({ commit }, event) {
      commit('addEvent', event);
    },
  },
  getters: {
    events: (state) => state.events,
  },
});
