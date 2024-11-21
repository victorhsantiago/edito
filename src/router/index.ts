import { createRouter, createWebHistory } from 'vue-router'
import EditPostModal from '@/components/EditPostModal.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'edit/:id',
          name: 'editPost',
          component: EditPostModal,
        },
        {
          path: 'new',
          name: 'newPost',
          component: EditPostModal,
        },
      ],
    },
  ],
})

export default router
