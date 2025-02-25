<template>
  <div class="flex justify-center mt-8 mb-12 w-full">
    <nav class="relative z-0 flex items-center w-full">
      <!-- Horizontal line spanning the width -->
      <div class="absolute top-1/2 w-full h-px bg-gray-200 -z-10"></div>
      
      <!-- Previous button - always visible but disabled on first page -->
      <div class="relative z-10">
        <NuxtLink v-if="currentPage > 1" 
                  :to="currentPage > 2 ? `/blog/page/${currentPage - 1}` : '/blog'"
                  class="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200 bg-white px-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </NuxtLink>
        <span v-else class="flex items-center text-gray-300 bg-white px-2 cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
      </div>
      
      <!-- Numbered pagination -->
      <div class="flex-grow flex justify-center space-x-4">
        <NuxtLink to="/blog" 
                  class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-200"
                  :class="currentPage === 1 ? 'bg-teal-500 text-white' : 'bg-white text-gray-500 hover:text-gray-700'">
          1
        </NuxtLink>
        
        <NuxtLink v-for="page in paginationNumbers" 
                  :key="page" 
                  :to="`/blog/page/${page}`"
                  class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-200"
                  :class="currentPage === page ? 'bg-teal-500 text-white' : 'bg-white text-gray-500 hover:text-gray-700'">
          {{ page }}
        </NuxtLink>
      </div>
      
      <!-- Next button -->
      <div class="relative z-10">
        <NuxtLink v-if="currentPage < totalPages" 
                  :to="`/blog/page/${currentPage + 1}`"
                  class="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200 bg-white px-2">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
        <span v-else class="flex items-center text-gray-300 bg-white px-2 cursor-not-allowed">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxDisplayed: {
    type: Number,
    default: 8
  }
});

// Calculate which page numbers to display
const paginationNumbers = computed(() => {
  const maxPages = Math.min(props.totalPages, props.maxDisplayed);
  const result = [];
  
  // If we have 8 or fewer pages, show all of them (except page 1 which is shown separately)
  if (props.totalPages <= props.maxDisplayed) {
    for (let i = 2; i <= props.totalPages; i++) {
      result.push(i);
    }
    return result;
  }
  
  // Otherwise, show a window of pages around the current page
  const halfWindow = Math.floor((maxPages - 2) / 2);
  let start = Math.max(2, props.currentPage - halfWindow);
  let end = Math.min(props.totalPages, start + maxPages - 2);
  
  // Adjust start if we're near the end
  if (end === props.totalPages) {
    start = Math.max(2, props.totalPages - maxPages + 1);
  }
  
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  
  return result;
});
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style> 