import Vue from 'vue';
import Vuex from 'vuex';
import EventDataNode from '../models/eventdatanode';
import TimelineDataNode from '../models/timelinedatanode';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    reminders : [],
    timeline : {},
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
    addTimelineData(state, timelineDataArray: TimelineDataNode[]) {
      timelineDataArray.forEach((timelineData: TimelineDataNode) => {
        if (!state.timeline[timelineData.occuranceDateString]) {
           state.timeline[timelineData.occuranceDateString] = [];
        }
        const dateData = state.timeline[timelineData.occuranceDateString] ;
        const index = dateData.findIndex(
          (e: TimelineDataNode) => e.eventData.id === timelineData.eventData.id &&
                                    e.reminderData.id === timelineData.reminderData.id,
        );
        if (index === -1) {
          dateData.push(timelineData);
        }
      });
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
    addTimelineData({ commit }, timelineDataArray) {
      commit('addTimelineData', timelineDataArray);
    },
  },
  getters: {
    events: (state) => state.events,
    reminders : (state) => state.reminders,
    timelineData : (state) => state.timeline,
  },
});
