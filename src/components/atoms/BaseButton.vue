<template>
    <button
        :class="buttonClasses"
        :style="buttonStyles"
        :type="type"
        @click="handleClick"
    >
        <span v-if="loading" class="loading-spinner"></span>
        <slot v-else />
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'text', 'gray'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['extra-small', 'small', 'medium', 'large'].includes(value)
  },
  type: {
      type: String,
      default: 'button',
  },
  loading: {
      type: Boolean,
      default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: null
  }
});

const emit = defineEmits(['click']);

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--full-width': props.fullWidth,
    'base-button--loading': props.loading
  }
]);

const buttonStyles = computed(() => {
  const styles = {};

  if(props.width) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }

  return styles;
});

const handleClick = (event) => {
    if(!props.loading) {
        emit('click', event)
    }
};
</script>

<style scoped>
.base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-family: Inter, sans-serif;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    outline: none;
    box-sizing: border-box;
}

/* Variants */
.base-button--primary {
  background-color: #9833ff;
  color: white;
  border: none;
}

.base-button--primary:hover {
  background-color: #7c2ae8;
}

.base-button--secondary {
  background-color: white;
  color: #9833ff;
  border: 1px solid #9833ff;
}

.base-button--secondary:hover {
  background-color: #f8f5ff;
}

.base-button--outline {
  background-color: transparent;
  color: #9833ff;
  border: 2px solid #9833ff;
}

.base-button--outline:hover {
  background-color: #9833ff;
  color: white;
}

.base-button--text {
  background-color: transparent;
  color: #9833ff;
  border: none;
}

.base-button--text:hover {
  background-color: rgba(152, 51, 255, 0.1);
}

.base-button--gray {
  background-color: #747474;
  color: white;
  border: none;
}

.base-button--gray:hover {
  background-color: #5a5a5a;
}

/* Sizes */
.base-button--extra-small {
  padding: 0 16px;
  font-size: 15px;
  height: 30px;
}

.base-button--small {
  padding: 0 20px;
  font-size: 18px;
  height: 40px;
}

.base-button--medium {
  padding: 0 24px;
  font-size: 18px;
  height: 48px;
}

.base-button--large {
  padding: 0 32px;
  font-size: 20px;
  height: 50px;
}

/* Full Width */
.base-button--full-width {
  width: 100%;
}

/* Loading */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
