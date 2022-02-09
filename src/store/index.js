import Vue from 'vue'
import Vuex from 'vuex'
import { application } from '@/store/modules/application-states'
import { DishMultiOptions } from '@/store/modules/dish-multi-options-states'
import { register } from '@/store/modules/register-states'
import { header } from '@/store/modules/header-states'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        application,
        register,
        header,
        DishMultiOptions
    }
})
