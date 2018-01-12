<template>
    <div class="container">
        <div class="row">
            <div class="col">
                
                <app-header></app-header>
                <hr>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    export default {
        components: {
            'app-header': Header
        }
    }
</script>

<style>
    body { 
        padding: 20px;
    }
</style>
