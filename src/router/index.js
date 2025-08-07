import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Pages
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Home from '@/pages/Home.vue'
import PostListView from '../components/PostListView.vue'
import PostDetailView from '../components/PostDetailView.vue'
import MyActivityView from '../components/MyActivityView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false },
    children: [
      {
        path: 'q',
        name: 'PostListView',
        component: PostListView
      },
      {
        path: 'a',
        name: 'PostDetailView',
        component: PostDetailView
      },
      {
        path: 'my',
        name: 'MyActivityView',
        component: MyActivityView
      },
      {
        // /home 로 진입했을 때 기본 보여줄 컴포넌트 (선택)
        path: '',
        name: 'PostListView',
        component: PostListView
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 로그인이 필요한 페이지 체크
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
    return
  }

  // 게스트만 접근 가능한 페이지 체크 (로그인된 사용자는 접근 불가)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router
