import Vue from 'vue';
import Vuex from 'vuex';
import EventDataNode from './models/eventdatanode';

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
    editEvent(state, event: any) {
      const index = state.events.findIndex(
        (e: EventDataNode) => e.id === event.id,
      );
      if (index !== -1) {
        state.events[index].name = event.name;
        state.events[index].date = event.date;
      }
    },
    removeEvent(state, eventIDToRemove: any) {
      const index = state.events.findIndex(
        (e: EventDataNode) => e.id === eventIDToRemove,
      );
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
    editEvent({ commit }, event) {
      commit('editEvent', event);
    },
  },
  getters: {
    events: (state) => state.events,
  },
});
