<template>
    <header>
        <div class="container header_cont">
            <div class="logo">
                Aw-App
            </div>
            <nav>
                <ul>
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li v-if="!isAuth">
                        <router-link to="/signin">Sign in</router-link>
                    </li>
                    <li v-if="!isAuth">
                        <router-link to="/signup">Sign up</router-link>
                    </li>
                    <li v-if="isAuth">
                        <router-link to="/dashboard">Dashboard</router-link>
                    </li>
                    <li>
                    <div
                            @click="signout"
                            :style="{'display':'inline'}" v-if="isAuth">
                        Sign out
                    </div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
    export default {
        name : 'header',
        methods:{
            signout(){
                this.$store.commit('logout');
            }
        },
        computed:{
            isAuth(){
                return this.$store.getters.checkAuth
            }
        }
    }
</script>
