import Main from '@/views/main.vue'

export default [
  {
    path: '/role',
    component: Main,
    children: [
      {
        path: '',
        meta: {
          title: '角色管理',
        },
        name: 'role',
        component: () => import('@/views/system/role.vue'),
      }
    ]
  },
  {
    path: '/user',
    component: Main,
    children: [
      {
        path: '',
        meta: {
          title: '用户管理',
        },
        name: 'user',
        component: () => import('@/views/system/user.vue'),
      }
    ]
  }
]