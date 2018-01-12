import Vue from 'vue';
import Vuex from 'vuex';
import activities from './modules/activities'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { couter: 0 },
    modules: {
        activities
    }
});