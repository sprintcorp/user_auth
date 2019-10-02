<template>
    <div class="container dashboard">
        <h1>Dashboard</h1>
        <div class="dash_content">
            <h3>Hello <span>{{user.email}}</span> !!</h3>
            <p>Here you can use you dashboard because you are authenticated</p>
        </div>
    </div>
</template>


<script>
    import {mapState} from 'vuex';
    export default {
        computed: {
            ...mapState([
                'user'
            ])
    },
        created() {
            let tokenId = this.$store.state.token;
            this.$store.dispatch('getUserInfo',tokenId)
        }
    }

</script>
