<template>
  <input
    :class="inputClasses"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password', 'number', 'tel', 'url'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const isFocused = ref(false)

const inputClasses = computed(() => [
  'base-input',
  `base-input--${props.size}`,
  {
    'base-input--error': props.error,
    'base-input--focused': isFocused.value,
    'base-input--disabled': props.disabled
  }
])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}
</script>

<style scoped>
.base-input {
  width: 100%;
  border: 2px solid #9833ff;
  border-radius: 10px;
  font-size: 18px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  background-color: white;
  color: #000000;
  transition: all 0.2s ease;
  outline: none;
  padding: 0 20px;
  height: 50px;
  box-sizing: border-box;
}

.base-input:focus {
  border-color: #9833ff;
  box-shadow: 0 0 0 3px rgba(152, 51, 255, 0.1);
}

.base-input:disabled {
  background-color: #f5f5f5;
  border-color: #e0e0e0;
  color: #999999;
  cursor: not-allowed;
}

.base-input::placeholder {
  color: #000000;
  opacity: 1;
  font-size: 18px;
}

/* Error State */
.base-input--error {
  border-color: #d63f3f;
}

.base-input--error:focus {
  border-color: #d63f3f;
  box-shadow: 0 0 0 3px rgba(214, 63, 63, 0.1);
}

/* Sizes */
.base-input--small {
  padding: 0 16px;
  font-size: 14px;
  height: 40px;
}

.base-input--medium {
  padding: 0 20px;
  font-size: 18px;
  height: 50px;
}

.base-input--large {
  padding: 0 24px;
  font-size: 20px;
  height: 60px;
}

/* Focus State */
.base-input--focused {
  border-color: #9833ff;
}

/* Success State */
.base-input--success {
  border-color: #9833ff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .base-input {
    font-size: 16px;
    height: 48px;
  }
  
  .base-input::placeholder {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .base-input {
    font-size: 14px;
    height: 44px;
    padding: 0 16px;
  }
  
  .base-input::placeholder {
    font-size: 14px;
  }
}
</style> 
