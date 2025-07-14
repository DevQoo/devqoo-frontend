<template>
  <div class="home">
    <div class="home__header">
      <BaseText tag="h1" variant="heading1" color="dark" weight="bold">
        DevQoo 메인 페이지
      </BaseText>
      
      <div class="home__nav">
        <template v-if="!isAuthenticated">
          <BaseButton variant="outline" @click="router.push('/login')">
            로그인
          </BaseButton>
          <BaseButton variant="primary" @click="router.push('/register')">
            회원가입
          </BaseButton>
        </template>
        
        <template v-else>
          <BaseText variant="body" color="dark" weight="medium">
            환영합니다, {{ user?.name }}님!
          </BaseText>
          <BaseButton variant="secondary" @click="handleLogout">
            로그아웃
          </BaseButton>
        </template>
      </div>
    </div>
    
    <div class="home__content">
      <BaseText tag="h2" variant="heading2" color="dark" weight="semibold" align="center">
        환영합니다! 🎉
      </BaseText>
      
      <BaseText variant="body" color="secondary" align="center">
        DevQoo 플랫폼에 오신 것을 환영합니다.
      </BaseText>
      
      <BaseText variant="body" color="secondary" align="center">
        교육과 커뮤니티를 통해 성장하는 개발자들의 공간입니다.
      </BaseText>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseText from '@/components/atoms/BaseText.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.home__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  margin-bottom: 60px;
}

.home__nav {
  display: flex;
  gap: 16px;
  align-items: center;
}

.home__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .home__header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .home__nav {
    flex-direction: column;
    gap: 12px;
  }
  
  .home__content {
    padding: 40px 0;
  }
}

@media (max-width: 480px) {
  .home {
    padding: 16px;
  }
  
  .home__nav {
    width: 100%;
  }
  
  .home__nav > * {
    flex: 1;
  }
}
</style> 