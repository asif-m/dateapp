import Vue from 'vue';
import Vuex from 'vuex';
import EventDataNode from '../models/eventdatanode';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    reminders : [],
    completetimeline: [],
    currenttimeline : [],
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
    initReminders(state, reminders: []) {
      state.reminders = reminders;
    },
    setCompleteTimeline(state, completetimeline: []) {
      state.completetimeline = completetimeline;
    },
    setCurrentTimelineList(state, currenttimeline: []) {
      state.currenttimeline = currenttimeline;
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
    initReminders({ commit }, reminders) {
      commit('initReminders', reminders);
    },
    setCompleteTimeline({ commit }, completetimeline: []) {
      commit('setCompleteTimeline', completetimeline);
    },
    setCurrentTimelineList({ commit }, currenttimeline: []) {
      commit('setCurrentTimelineList', currenttimeline);
    },
  },
  getters: {
    events: (state) => state.events,
    reminders : (state) => state.reminders,
    completetimeline : (state) => state.completetimeline,
    currenttimeline: (state) => state.currenttimeline,
  },
});
