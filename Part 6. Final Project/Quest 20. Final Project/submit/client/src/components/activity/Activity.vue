<template>
    <b-card :header="activity.name">
        <b-list-group flush>
            <b-list-group-item v-for="(val, key, index) in activity.values">{{ key + ": " + val }}</b-list-group-item>
            <b-list-group-item> <button class="btn btn-secondary" @click="launchEdit">edit</button></b-list-group-item>
        </b-list-group>
    </b-card>
</template>
<script>
export default {
    props: ['activity'],
    methods: {
        launchEdit() {
            this.$store.dispatch('setCurrentEdit', { activity:this.activity });
            this.$store.dispatch('toggleModal');
        }
    }
}
</script>
<style>
.card-body {
    padding: 0;
}
</style>
