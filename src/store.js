import Vue from 'vue'
import Vuex from 'vuex'
import response from "vue-resource/src/http/response";


Vue.use(Vuex);
const fbUrl = "https://identitytoolkit.googleapis.com/v1/accounts";
const fbKey = "AIzaSyA3DF21T8xyVEbRVOEV9bfNUO39qSMUBIY";
export default new Vuex.Store({
    state: {
      email:"",
        token:"",
        refreshToken:""
    },
    getters: {
      
    },
    mutations: {
        auth(state,authData){
            state.email = authData.email;
            state.token = authData.idToken;
            state.refreshToken = authData.refreshToken
        },
        logout(state){
            state.email = null;
            state.token = null;
            state.refreshToken = null;

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("email");
        }
    },
    actions: {
        signin({commit},payload) {
            Vue.http.post(`${fbUrl}:signInWithPassword?key=${fbKey}`, {
                ...payload,
                returnSecureToken: true
            })
                .then(response => response.json())
                .then(authData =>{
                    commit("auth",authData);
                    localStorage.setItem("token",authData.idToken);
                    localStorage.setItem("refreshToken",authData.refreshToken);
                    localStorage.setItem("email",authData.email);
                })
                .catch(error => console.log(error))
        },
      signup({commit},payload){
        Vue.http.post(`${fbUrl}:signUp?key=${fbKey}`,{
            ...payload,
            returnSecureToken: true
        })
            .then(response => response.json())
            .then(authData =>{
                commit("auth",authData);
                localStorage.setItem("token",authData.idToken);
                localStorage.setItem("refreshToken",authData.refreshToken);
                localStorage.setItem("email",authData.email);
            })
            .catch(error => console.log(error))
      }
    }
  })