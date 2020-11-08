import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'create',
    //     component: () =>
    //         import ('../views/Create.vue')
    // },
    {
        path: '/',
        name: 'list',
        component: () =>
            import ('../views/List.vue')
    },
    {
        path: '/company/:id',
        name: 'company',
        component: () =>
            import ('../views/Task.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router