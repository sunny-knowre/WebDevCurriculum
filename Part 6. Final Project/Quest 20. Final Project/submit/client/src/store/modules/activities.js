import data from '../../data/db'

const state = {
    activities:  [],
    currentEdit: {},
    showModal: false

};
const mutations = {
    'SET_ACTIVITIES' (state, activities) {
        state.activities = activities
    },
    'SHOW_MODAL' (state) {
        state.showModal = true;
    },
    'HIDE_MODAL' (state) {
        state.showModal = false;
    },
    'SET_CURRENT_EDIT' (state, payload){
        state.currentEdit = payload.activity;
    },
    'SAVE_CURRENT_EDIT' (state, payload){
        Object.keys(state.activities).forEach( (key) => {
            let obj = state.activities[key];
            if(payload.activity.id === obj.id ){
                state.activities[key] = payload.activity;
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
        commit('SET_ACTIVITIES', data)
    },
    toggleModal: ({commit}) => {
        if(state.showModal)
            commit('HIDE_MODAL')
        else
            commit('SHOW_MODAL')
    },
    setCurrentEdit({commit}, payload) {
        commit('SET_CURRENT_EDIT', payload);
    },
    saveCurrentEdit({commit}, payload) {
        commit('SAVE_CURRENT_EDIT', payload);
    },
    deleteActivity({commit}, id){
        commit('DELETE_ACTIVITY', id);
    }
};

const getters = {  
    activities: state => {
        return state.activities;
    },
    showModal: state => {
        return state.showModal;
    },
    currentEdit: state => {
        return state.currentEdit;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};