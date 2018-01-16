<template>
<b-container>
    <app-edit-activity :showModal="showModal">
    </app-edit-activity>
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
import ActivityEdit from './ActivityEdit.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        'appActivity' : Activity,
        'appEditActivity': ActivityEdit
    },    
    data() {
        return {
            filterKey: ''
        }
    },
    computed: {
        ...mapGetters([
            'showModal',
            'activities'
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