import Vue from 'vue'
import Router from 'vue-router'
import AppLocalStorage from '@/store/localstorage'
import LoginPage from '@/components/Login/LoginPage'

Vue.use(Router)
const routes = [
    {
        path: '/login',
        component: LoginPage,
        meta: {
            requiresAuth: false,
            showHeader: false
        }
    },
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
    if (to.path === '/login' && AppLocalStorage.getUserToken()) {
        next('/')
    }
    if (AppLocalStorage.getUserToken()) {
        next()
    } else {
        if (to.meta.requiresAuth) {
            next('/')
        } else {
            next()
        }
    }
}

router.beforeEach(checkLoginMiddleware)

export default router
