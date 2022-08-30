export default [
    {
        path: '/',
        redirect: 'role'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    }
]