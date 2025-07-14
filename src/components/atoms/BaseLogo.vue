<template>
  <component
    :is="tag"
    :class="logoClasses"
  >
    <img
      :src="logoSrc"
      :alt="altText"
      :class="imageClasses"
    >
  </component>
</template>

<script setup>
import { computed } from 'vue'
import logoImage from '@/assets/logo.png'

const props = defineProps({
  tag: {
    type: String,
    default: 'div',
    validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge', 'custom'].includes(value)
  },
  customSize: {
    type: String,
    default: null
  },
  alt: {
    type: String,
    default: 'DevQoo 로고'
  }
})

const logoClasses = computed(() => [
  'base-logo',
  `base-logo--${props.size}`
])

const imageClasses = computed(() => [
  'base-logo__image',
  `base-logo__image--${props.size}`
])

const logoSrc = computed(() => logoImage)
const altText = computed(() => props.alt)
</script>

<style scoped>
.base-logo {
  margin: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
}

.base-logo:hover {
  transform: scale(1.05);
}

.base-logo__image {
  display: block;
  max-width: 100%;
  height: auto;
  transition: all 0.2s ease;
}

/* Sizes */
.base-logo--small .base-logo__image {
  height: 1.5rem;
}

.base-logo--medium .base-logo__image {
  height: 1.875rem;
}

.base-logo--large .base-logo__image {
  height: 2.5rem;
}

.base-logo--xlarge .base-logo__image {
  height: 3rem;
}

.base-logo--custom .base-logo__image {
  height: var(--custom-size, 200px);
  width: var(--custom-size, 200px);
  object-fit: contain;
}
</style>
