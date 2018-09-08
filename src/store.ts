import Vue from 'vue';
import Vuex from 'vuex';
import { EventDataList, EventData } from './models/eventdata';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: EventDataList,
  },
  mutations: {
    initList(state, dates: EventDataList) {
      state.events = dates;
    },
    addEvent(state, date: EventData) {
      state.events.push(date);
    },
  },
  actions: {},
});
