import Vue from 'vue'
import Vuex from 'vuex'
import response from "vue-resource/src/http/response";
import router from './routes'

Vue.use(Vuex);
const fbUrl = "https://identitytoolkit.googleapis.com/v1/accounts";
const fbKey = "AIzaSyA3DF21T8xyVEbRVOEV9bfNUO39qSMUBIY";

const store = {
    state: {
        email: "",
        token: "",
        refreshToken: "",
        user:""
    },
    getters: {
        checkAuth(state) {
            if (state.token) {
                return true
            }
            return false
        }
    },
    mutations: {
        auth(state, authData) {
            state.email = authData.email;
            state.token = authData.idToken;
            state.refreshToken = authData.refreshToken
            router.push('/dashboard')
        },
        getUserData(state,userInfo){
            state.user = userInfo
        },
        logout(state) {
            state.email = null;
            state.token = null;
            state.refreshToken = null;

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("email");
            router.push('/')
        }
    },
    actions: {
        signin({commit}, payload)
        {
            Vue.http.post(`${fbUrl}:signInWithPassword?key=${fbKey}`, {
                ...payload,
                returnSecureToken: true
            })
                .then(response => response.json())
                .then(authData => {
                    commit("auth", authData);
                    localStorage.setItem("token", authData.idToken);
                    localStorage.setItem("refreshToken", authData.refreshToken);
                    localStorage.setItem("email", authData.email);
                })
                .catch(error => console.log(error))
        },
        signup({commit}, payload)
        {
            Vue.http.post(`${fbUrl}:signUp?key=${fbKey}`, {
                ...payload,
                returnSecureToken: true
            })
                .then(response => response.json())
                .then(authData => {
                    commit("auth", authData);
                    localStorage.setItem("token", authData.idToken);
                    localStorage.setItem("refreshToken", authData.refreshToken);
                    localStorage.setItem("email", authData.email);
                })
                .catch(error => console.log(error))
        },
        refreshToken({commit})
        {
            const refreshToken = localStorage.getItem("refreshToken")

            if(refreshToken){
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${fbKey}`, {
                    grant_type: 'refresh_token',
                        refresh_token:refreshToken
                })
                    .then(response => response.json())
                    .then(authData => {
                        commit("auth",{
                            idToken: authData.id_token,
                            refreshToken:authData.refresh_token

                        });
                        localStorage.setItem("token", authData.id_token);
                        localStorage.setItem("refreshToken", authData.refresh_token);
                    })
            }
        },
        getUserInfo({commit},payload)
        {
            Vue.http.post(`${fbUrl}:lookup?key=${fbKey}`, {
                idToken: payload
            })
                .then(response => response.json())
                .then(userData => {
                    commit("getUserData", userData.users[0]);
                    // localStorage.setItem("token", authData.idToken);
                    // localStorage.setItem("refreshToken", authData.refreshToken);
                    // localStorage.setItem("email", authData.email);
                })
        }
    }
};
export default new Vuex.Store(store);