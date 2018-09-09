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
    removeEvent(state, eventIDToRemove: any) {
      const index = state.events.findIndex((e) => e.id === eventIDToRemove);
      if (index !== -1) {
        state.events.splice(index, 1);
      }
    },
  },
  actions: {
    initList({ commit }, events) {
      commit('initList', events);
    },
    addEvent({ commit }, event) {
      commit('addEvent', event);
    },
    removeEvent({ commit }, eventIDToRemove) {
      commit('removeEvent', eventIDToRemove);
    },
  },
  getters: {
    events: (state) => state.events,
  },
});
