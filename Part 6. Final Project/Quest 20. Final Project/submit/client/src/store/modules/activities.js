import data from '../../data/activity_types';
import _ from 'lodash';

const state = {
    activities:  []
};

const mutations = {
    'SET_ACTIVITIES' (state, activities) {
        state.activities = activities;
    },
    'SAVE_ACTIVITY' (state, payload){
        Object.keys(state.activities).forEach( (key) => {
            let obj = state.activities[key];
            if(payload.id === obj.id ){
                state.activities[key] = payload;
            }
          });
    },
    'DELETE_ACTIVITY' (state, id){
        const record = state.activities.find(element => element.id === id );
        state.activities.splice(state.activities.indexOf(record),1);
    }
};

const actions = { 
    initActivities: ({commit}) => {
        commit('SET_ACTIVITIES', data);
    }
};

const getters = {  
    activities: state => {
        return state.activities;
    },
    getClonedActivity: (state) => (id) => {
        const record = state.activities.find(act => act.id == id);
        return _.cloneDeep(record);
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};