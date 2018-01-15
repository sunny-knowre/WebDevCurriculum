<template>
<b-container>
    <div>
        <b-modal title="Edit Activity" v-model="showModal" ok-title="save" @ok="saveModal" @cancel="cancelModal">
            <slot name="modal-title"> {{ currentEdit }}</slot>
        </b-modal>
    </div>
    <b-row class="mb-4">
        <b-input-group left="Filter">
            <b-form-input placeholder="Search"
                v-model="filterKey">
            </b-form-input>
        </b-input-group>
    </b-row>
    <b-row>
         <b-card-group columns>
            <app-activity v-for="activity in filteredData" 
                :activity="activity">
            </app-activity>
        </b-card-group>
    </b-row>
</b-container>
</template>
<script>
import Activity from './Activity.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        'appActivity' : Activity
    },    
    data() {
        return {
            filterKey: ''
        }
    },
    methods: {
        cancelModal() {
             this.$store.dispatch('toggleModal');
            console.log('cancel');
        },
        saveModal() {
             this.$store.dispatch('toggleModal');
            console.log('save');
        }
    },
    computed: {
        ...mapGetters([
            'showModal',
            'activities',
            'currentEdit'
        ]),
        filteredData() {
            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            var data = this.activities
            if (filterKey) {
                data = data.filter( (row) => {
                    return Object.keys(row).some( (key) => {
                        if(key == 'name')
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        else if(key=='values'){
                            return Object.keys(row[key]).some( (valueKey) => {
                                return String(row[key][valueKey]).toLowerCase().indexOf(filterKey) > -1 
                            })
                        }
                    })
                })
            }
            return data
        }
    }
}
</script>

<style>
</style>