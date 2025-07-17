<template>
  <div :class="formGroupClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  spacing: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  }
})

const formGroupClasses = computed(() => [
  'form-group',
  `form-group--${props.spacing}`
])
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group--small {
  gap: 12px;
}

.form-group--medium {
  gap: 16px;
}

.form-group--large {
  gap: 20px;
}

.form-group--xlarge {
  gap: 24px;
}
</style> 
