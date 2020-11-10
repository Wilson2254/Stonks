import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'list',
        component: () =>
            import ('../views/ListCompany.vue')
    },
    {
        path: '/company/:symbol',
        name: 'company',
        component: () =>
            import ('../views/Company.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router