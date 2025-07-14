<template>
  <div class="input-field">
    <div class="input-field__input-wrapper">
      <BaseInput
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :required="required"
        :error="hasError"
        :size="size"
        v-bind="$attrs"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        class="input-field__input"
      />
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
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
    type: [Boolean, String],
    default: false
  },
  helpText: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium'
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// Generate unique ID for input
const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const hasError = computed(() => {
  return Boolean(props.error)
})

const errorMessage = computed(() => {
  if (typeof props.error === 'string') {
    return props.error
  }
  return ''
})
</script>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

.input-field__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field__input {
  width: 100%;
  height: 50px;
  border: 2px solid #9833ff;
  border-radius: 10px;
  padding: 0 20px;
  font-size: 18px;
  font-family: Inter, sans-serif;
  background-color: white;
  color: #000000;
  transition: border-color 0.2s ease;
}

.input-field__input:focus {
  outline: none;
  border-color: #9833ff;
  box-shadow: 0 0 0 3px rgba(152, 51, 255, 0.1);
}

.input-field__input:error,
.input-field__input.error {
  border-color: #d63f3f;
}

.input-field__input::placeholder {
  color: #000000;
  opacity: 1;
}

/* Success state */
.input-field__input.success {
  border-color: #9833ff;
}
</style> 