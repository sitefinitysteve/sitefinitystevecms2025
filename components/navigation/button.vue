<template>
  <button 
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      { 'opacity-70 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="$slots.icon && iconPosition === 'left'" class="mr-2">
      <slot name="icon" />
    </span>
    <slot />
    <span v-if="$slots.icon && iconPosition === 'right'" class="ml-2">
      <slot name="icon" />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value: string) => ['left', 'right'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-sm px-3 py-1.5';
    case 'lg': return 'text-lg px-6 py-3';
    default: return 'text-base px-4 py-2';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 focus:ring-orange-500';
    case 'secondary':
      return 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500';
    case 'outline':
      return 'bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-50 focus:ring-orange-500';
    case 'ghost':
      return 'bg-transparent text-orange-500 hover:bg-orange-50 focus:ring-orange-500';
    default:
      return 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500';
  }
});
</script>

<style>

</style>