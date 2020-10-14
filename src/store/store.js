import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

import config from "../config"
// import { url } from 'vuelidate/lib/validators'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        pengguna: localStorage.getItem('auth') || '',
        checklist: null
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, user) {
            state.status = 'success'
            state.pengguna = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.pengguna = null
        },
        getAllchecklist(state, data) {
            state.checklist = data
        }
    },
    actions: {
        signup({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                Axios.post(`${config.apiUrl}/register`, user, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => {
                        console.log(resp);
                        if (resp.statusCode == 200) {
                            localStorage.setItem("auth", JSON.stringify(resp));
                            commit('auth_success', JSON.stringify(resp))
                        }
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('auth')
                        reject(err)
                    })
            })
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                Axios.post(`${config.apiUrl}/login`, user, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => {
                        console.log(resp);
                        if (resp.status == 200) {
                            localStorage.setItem("auth", JSON.stringify(resp));
                            commit('auth_success', JSON.stringify(resp))
                        }
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('auth')
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('auth')
                resolve()
            })
        },
        // getAllCheckList({ commit }) {
        //     // return new Promise((resolve) => {
        //     //     Axios.get(`${config.apiUrl}/checklist`)
        //     //         .then(resp => {
        //     //             if (resp.status == 200) {
        //     //                 commit('checklist', JSON.stringify(resp))
        //     //             }
        //     //             resolve(resp)
        //     //         })
        //     //         .catch(err => {
        //     //             commit('auth_error')
        //     //             reject(err)
        //     //         })
        //     // })
        // }
    },
    getters: {
        isLoggedIn: state => Boolean(state.pengguna),
        pengguna: state => state.pengguna ? JSON.parse(state.pengguna) : null,
    }
})

export default store