import Vue from 'vue'
import Router from 'vue-router'
import AppLocalStorage from '@/store/localstorage'
import LoginPage from '@/components/Login/LoginPage'
import StallPage from '@/components/Stall/StallPage.vue'
import FoodPage from '@/components/Food/FoodPage.vue'
import { PATH } from '@/Api/const.js'

Vue.use(Router)
const routes = [
    {
        path: PATH.LOGIN,
        component: LoginPage,
        meta: {
            requiresAuth: false,
            showHeader: false
        }
    },
    {
        path: '/',
        component: StallPage,
        meta: {
            requiresAuth: true,
            showHeader: false
        }
    },
    {
        path: PATH.FOOD,
        component: FoodPage,
        meta: {
            requiresAuth: true,
            showHeader: false
        }
    }
]

const router = new Router({
    routes,
    base: '/',
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

// middleware
function checkLoginMiddleware (to, from, next) {
    if (to.path === PATH.LOGIN && AppLocalStorage.getUserToken()) {
        next('/')
    }
    if (AppLocalStorage.getUserToken()) {
        next()
    } else {
        if (to.meta.requiresAuth) {
            next(PATH.LOGIN)
        } else {
            next()
        }
    }
}

router.beforeEach(checkLoginMiddleware)

export default router
