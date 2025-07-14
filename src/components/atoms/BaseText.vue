<template>
  <component
    :is="tag"
    :class="textClasses"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'p',
    validator: (value) => ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'].includes(value)
  },
  variant: {
    type: String,
    default: 'body',
    validator: (value) => ['heading1', 'heading2', 'heading3', 'heading4', 'body', 'caption', 'label'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'muted'].includes(value)
  },
  weight: {
    type: String,
    default: 'normal',
    validator: (value) => ['light', 'normal', 'medium', 'semibold', 'bold'].includes(value)
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right', 'justify'].includes(value)
  }
})

const textClasses = computed(() => [
  'base-text',
  `base-text--${props.variant}`,
  `base-text--${props.color}`,
  `base-text--${props.weight}`,
  `base-text--${props.align}`
])
</script>

<style scoped>
.base-text {
  margin: 0;
  font-family: inherit;
  line-height: 1.5;
}

/* Variants */
.base-text--heading1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.base-text--heading2 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.25;
}

.base-text--heading3 {
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.3;
}

.base-text--heading4 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.35;
}

.base-text--body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

.base-text--caption {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
}

.base-text--label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
}

/* Colors */
.base-text--primary {
  color: #212529;
}

.base-text--secondary {
  color: #6c757d;
}

.base-text--success {
  color: #28a745;
}

.base-text--danger {
  color: #dc3545;
}

.base-text--warning {
  color: #ffc107;
}

.base-text--info {
  color: #17a2b8;
}

.base-text--light {
  color: #f8f9fa;
}

.base-text--dark {
  color: #343a40;
}

.base-text--muted {
  color: #6c757d;
}

/* Weights */
.base-text--light {
  font-weight: 300;
}

.base-text--normal {
  font-weight: 400;
}

.base-text--medium {
  font-weight: 500;
}

.base-text--semibold {
  font-weight: 600;
}

.base-text--bold {
  font-weight: 700;
}

/* Alignment */
.base-text--left {
  text-align: left;
}

.base-text--center {
  text-align: center;
}

.base-text--right {
  text-align: right;
}

.base-text--justify {
  text-align: justify;
}
</style> 
