<template>
  <div class="login-form">
    <div class="login-form__header">
      <BaseLogo
        size="custom"
        class="login-form__logo"
      />
    </div>

    <form @submit.prevent="handleSubmit" class="login-form__form">
      <FormGroup spacing="large">
        <InputField
          v-model="form.email"
          type="email"
          label="아이디 (이메일)"
          placeholder="아이디 (이메일)"
          size="large"
          required
          :error="errors.email"
          :disabled="isLoading"
          class="login-form__input"
        />

        <InputField
          v-model="form.password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호"
          size="large"
          required
          :error="errors.password"
          :disabled="isLoading"
          class="login-form__input"
        />

        <div class="login-form__forgot-password">
          <a href="/">
            아이디/비밀번호 찾기 >
          </a>
        </div>

        <BaseButton
          type="submit"
          variant="primary"
          size="large"
          full-width
          :loading="isLoading"
          class="login-form__button login-form__login-button"
        >
          로그인
        </BaseButton>

        <div class="login-form__signup-divider">
          <div class="login-form__divider-line"></div>
        </div>

        <BaseButton
          type="button"
          variant="secondary"
          size="large"
          full-width
          @click="$router.push('/register')"
          class="login-form__button login-form__signup-button"
        >
          회원가입
        </BaseButton>
      </FormGroup>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/atoms/BaseButton.vue'
import InputField from '@/components/molecules/InputField.vue'
import FormGroup from '@/components/molecules/FormGroup.vue'
import BaseLogo from '@/components/atoms/BaseLogo.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

const isLoading = computed(() => authStore.isLoading)

const isFormValid = computed(() => {
  return form.value.email && form.value.password && !isLoading.value
})

const validateForm = () => {
  errors.value = {
    email: '',
    password: ''
  }

  let isValid = true

  if (!form.value.email) {
    errors.value.email = '이메일을 입력해주세요.'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = '올바른 이메일 형식이 아닙니다.'
    isValid = false
  }

  if (!form.value.password) {
    errors.value.password = '비밀번호를 입력해주세요.'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = '비밀번호는 6자리 이상이어야 합니다.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  console.log('handleSubmit');
  if (!validateForm()) return

  try {
    const result = await authStore.login({
      email: form.value.email,
      password: form.value.password
    })

    if (result.success) {
      router.push('/home')
    }
  } catch (error) {
    console.error('Login error:', error)
  }
}
</script>

<style scoped>
.login-form {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 0 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -300px;
  padding: 100px 150px 100px 150px;
}

.login-form__header {
  text-align: center;
}

.login-form__logo {
  position: relative;
  z-index: 10;
  text-align: center;
}

.login-form__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-form__input {
  width: 400px;
  height: 50px;
}

.login-form__button {
  width: 400px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
}

.login-form__login-button {
  background-color: #9833ff;
  color: white;
  border: none;
}

.login-form__signup-button {
  background-color: white;
  color: #9833ff;
  border: 1px solid #9833ff;
}

.login-form__forgot-password {
  text-align: right;
}

.login-form__forgot-password a {
  font-size: 15px;
  color: #000000;
}

.login-form__signup-divider {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 0;
  width: 400px;
}

.login-form__divider-line {
  flex: 1;
  height: 1px;
  background-color: #000000;
}
</style>
