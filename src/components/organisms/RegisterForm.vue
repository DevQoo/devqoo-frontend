<template>
  <div class="register-form">
    <div class="register-form__header">
      <BaseLogo
        size="large"
        class="register-form__logo"
      />
    </div>

    <form @submit.prevent="handleSubmit" class="register-form__form">
      <FormGroup spacing="large">
        <div class="register-form__field">
          <InputField
            v-model="form.email"
            type="email"
            label="아이디 (이메일)"
            placeholder="아이디 (이메일)"
            required
            :error="errors.email"
            :disabled="isLoading"
            :class="{ 'input-success': emailValid }"
            class="register-form__input"
          />
          <div class="register-form__message">
            <BaseText
              v-if="emailValid"
              variant="body"
              class="register-form__message--success"
            >
              사용 가능한 아이디입니다.
            </BaseText>
            <BaseText
              v-else-if="errors.email"
              variant="body"
              class="register-form__message--error"
            >
              {{ errors.email }}
            </BaseText>
          </div>
        </div>

        <div class="register-form__field">
          <InputField
            v-model="form.name"
            type="text"
            label="닉네임"
            placeholder="닉네임"
            required
            :error="errors.name"
            :disabled="isLoading"
            class="register-form__input"
          />
          <div class="register-form__message">
            <BaseText
              v-if="errors.name"
              variant="body"
              class="register-form__message--error"
            >
              {{ errors.name }}
            </BaseText>
          </div>
        </div>

        <div class="register-form__field">
          <InputField
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            label="비밀번호"
            placeholder="비밀번호"
            required
            :error="errors.password"
            :disabled="isLoading"
            class="register-form__input"
          >
            <template #append>
              <button
                type="button"
                @click="togglePassword"
                class="register-form__password-toggle"
              >
                <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              </button>
            </template>
          </InputField>
          <div class="register-form__message">
            <BaseText
              v-if="errors.password"
              variant="body"
              class="register-form__message--error register-form__message--multiline"
            >
              10자리 이상<br>대소문자 영어 or 숫자 or 특수문자 2가지 이상 조합
            </BaseText>
          </div>
        </div>

        <div class="register-form__field">
          <InputField
            v-model="form.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            required
            :error="errors.confirmPassword"
            :disabled="isLoading"
            class="register-form__input"
          />
          <div class="register-form__message">
            <BaseText
              v-if="errors.confirmPassword"
              variant="body"
              class="register-form__message--error"
            >
              비밀번호가 일치하지 않습니다.
            </BaseText>
          </div>
        </div>

        <BaseButton
          type="submit"
          variant="primary"
          size="large"
          full-width
          :loading="isLoading"
          :disabled="!isFormValid"
          class="register-form__button register-form__register-button"
        >
          회원가입
        </BaseButton>

        <BaseButton
          type="button"
          variant="primary"
          size="large"
          full-width
          @click="$router.push('/login')"
          class="register-form__button register-form__login-button"
        >
          로그인
        </BaseButton>
      </FormGroup>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseText from '@/components/atoms/BaseText.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import InputField from '@/components/molecules/InputField.vue'
import FormGroup from '@/components/molecules/FormGroup.vue'
import BaseLogo from '@/components/atoms/BaseLogo.vue'

const router = useRouter()
// const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)

// const isLoading = computed(() => authStore.isLoading)

const emailValid = computed(() => {
  return form.value.email &&
         /\S+@\S+\.\S+/.test(form.value.email) &&
         !errors.value.email
})

const isFormValid = computed(() => {
  return form.value.name &&
         form.value.email &&
         form.value.password &&
         form.value.confirmPassword &&
         !isLoading.value
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const validateForm = () => {
  errors.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  let isValid = true

  if (!form.value.name) {
    errors.value.name = '닉네임이 있따 다른걸로 하거라'
    isValid = false
  } else if (form.value.name.length < 2) {
    errors.value.name = '닉네임이 있따 다른걸로 하거라'
    isValid = false
  }

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
  } else if (form.value.password.length < 10) {
    errors.value.password = '10자리 이상 대소문자 영어 or 숫자 or 특수문자 2가지 이상 조합'
    isValid = false
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = '비밀번호 확인을 입력해주세요.'
    isValid = false
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = '비밀번호가 일치하지 않습니다.'
    isValid = false
  }

  return isValid
}

// const handleSubmit = async () => {
//   if (!validateForm()) return

//   try {
//     const result = await authStore.register({
//       name: form.value.name,
//       email: form.value.email,
//       password: form.value.password,
//       confirmPassword: form.value.confirmPassword
//     })

//     if (result.success) {
//       alert('회원가입이 완료되었습니다!')
//       router.push('/login')
//     }
//   } catch (error) {
//     console.error('Register error:', error)
//   }
// }
</script>

<style scoped>
.register-form {
  background-color: white;
  padding: 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
}

.register-form__header {
  text-align: center;
}

.register-form__logo {
  margin-bottom: 90px;
}

.register-form__logo img {
  height: 50px;
  width: auto;
}

.register-form__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.register-form__field {
  margin-bottom: 20px;
}

.register-form__input {
  width: 600px;
  height: 50px;
}

.register-form__input.input-success {
  border-color: #9833ff;
}

.register-form__button {
  width: 400px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
}

.register-form__register-button {
  background-color: #9833ff;
  color: white;
  border: none;
  margin-bottom: 20px;
}

.register-form__login-button {
  background-color: #9833ff;
  color: white;
  border: none;
}

.register-form__message {
  margin-top: 10px;
  text-align: left;
  width: 600px;
}

.register-form__message--success {
  color: #9833ff !important;
  font-size: 15px;
}

.register-form__message--error {
  color: #d63f3f !important;
  font-size: 15px;
}

.register-form__message--multiline {
  line-height: 18px;
}

.register-form__password-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 16px;
  padding: 0;
  margin: 0;
}

.register-form__password-toggle:hover {
  color: #9833ff;
}

/* Focus state for inputs */
.register-form__input:focus-within {
  border-color: #9833ff !important;
}

/* Large desktop styles for 1920x1080 */
@media (min-width: 1920px) {
  .register-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

/* Responsive Design for smaller screens */
@media (max-width: 1919px) {
  .register-form {
    max-width: 100%;
    padding: 20px;
  }

  .register-form__input,
  .register-form__message {
    width: 100%;
    max-width: 600px;
  }

  .register-form__button {
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .register-form {
    padding: 20px;
  }

  .register-form__input,
  .register-form__message {
    width: 100%;
  }

  .register-form__button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .register-form {
    padding: 16px;
  }

  .register-form__input,
  .register-form__message,
  .register-form__button {
    width: 100%;
  }
}
</style>
