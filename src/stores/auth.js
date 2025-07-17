import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref('')

  // Actions
  const login = async (credentials) => {
    try {
      isLoading.value = true
      error.value = ''
      
      // 실제 API 호출 대신 임시 로직
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 임시 사용자 데이터
      user.value = {
        id: 1,
        email: credentials.email,
        name: '사용자'
      }
      
      isAuthenticated.value = true
      return { success: true }
      
    } catch (err) {
      error.value = '로그인에 실패했습니다.'
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    try {
      isLoading.value = true
      error.value = ''
      
      // 비밀번호 확인
      if (userData.password !== userData.confirmPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.')
      }
      
      // 실제 API 호출 대신 임시 로직
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return { success: true }
      
    } catch (err) {
      error.value = err.message || '회원가입에 실패했습니다.'
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    error.value = ''
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login,
    register,
    logout,
    clearError
  }
});
