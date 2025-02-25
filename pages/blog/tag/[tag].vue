<template>
  <section class="blog">
    <div class="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div class="absolute inset-0">
        <div class="bg-white h-1/3 sm:h-2/3"></div>
      </div>
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center">
          <div>
            <h1 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              <span class="capitalize text-teal-500 mr-2">{{ $route.params.tag }} 🏷️</span>
              <span class="font-normal">in the blog</span>
            </h1>
          </div>
        </div>
        
        <div class="mt-12 grid grid-cols-4">
          <!-- Main content - Blog posts -->
          <div class="col-span-12 lg:col-span-3 gap-5 max-w-lg mx-auto lg:max-w-none">
            <div v-for="post in filteredPosts" :key="post._path" class="py-12">
              <article class="blog-post space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <div>
                  <dl>
                    <dt class="sr-only">Published on</dt>
                    <dd class="text-base leading-6 font-medium text-gray-500">
                      <time :datetime="post.publishedAt">
                        {{ formatDate(post.publishedAt) }}
                      </time>
                    </dd>
                  </dl>
                  <div v-if="post.tags && post.tags.length > 0" 
                       class="text-xs leading-5 font-medium text-orange-400 my-3 post-tagged-with">
                    <NuxtLink v-for="tag in post.tags" 
                              :key="tag" 
                              :to="`/blog/tag/${tag.toLowerCase()}`"
                              class="tag hover:underline bg-orange-100 py-1 px-3 mr-2 capitalize">
                      {{ tag }}
                    </NuxtLink>
                  </div>
                </div>
                <div class="space-y-5 xl:col-span-3">
                  <div class="space-y-6">
                    <h3 class="text-2xl leading-8 font-bold tracking-tight">
                      <NuxtLink :to="post._path" class="text-gray-900">{{ post.title }}</NuxtLink>
                    </h3>
                    <div class="prose max-w-none text-gray-500">
                      <p>{{ post.seoDescription || post.description }}</p>
                    </div>
                  </div>
                  <div class="text-base leading-6 font-medium">
                    <NuxtLink :to="post._path" class="text-teal-500 hover:text-teal-600">
                      Read more →
                    </NuxtLink>
                  </div>
                </div>
              </article>
            </div>
            
            <!-- Show message if no posts found -->
            <div v-if="filteredPosts.length === 0" class="py-12 text-center">
              <p class="text-lg text-gray-500">No posts found with this tag.</p>
            </div>
          </div>
          
          <!-- Sidebar - Top posts and tags -->
          <div class="col-span-12 lg:col-span-1 gap-2 px-5">
            <div class="pl-2">
              <h2 class="text-2xl mb-3">TOP POSTS 🔥</h2>
              <ul>
                <ContentQuery path="/blog" :limit="5" :sort="{publishedAt: -1}" v-slot="{ data }">
                  <li v-for="post in data" :key="post._path">
                    <NuxtLink :to="post._path" 
                              class="block text-sm leading-5 font-medium text-teal-500 hover:underline mb-4">
                      {{ post.title }}
                    </NuxtLink>
                  </li>
                </ContentQuery>
              </ul>

              <h2 class="text-2xl mb-3 mt-10">TAGS</h2>
              <div id="tag-cloud">
                <ContentQuery path="/blog" v-slot="{ data }">
                  <NuxtLink v-for="tag in getAllTags(data)" 
                            :key="tag" 
                            :to="`/blog/tag/${tag.toLowerCase()}`"
                            class="tag inline-block cursor-pointer text-sm leading-5 font-medium text-gray-400 hover:text-white hover:bg-teal-500 bg-gray-200 py-1 px-3 rounded-full mr-3 mb-4"
                            :class="{ 'bg-teal-500 text-white': tag.toLowerCase() === $route.params.tag.toLowerCase() }">
                    {{ tag }}
                  </NuxtLink>
                </ContentQuery>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-5">
          <NuxtLink id="clear-filter" 
                    to="/blog"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150">
            Clear filter
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from 'nuxt/app';

// Get the current route
const route = useRoute();
const currentTag = route.params.tag.toLowerCase();

// Get all blog posts
const { data: posts } = await useAsyncData(`blog-posts-tag-${currentTag}`, () => 
  queryContent('/blog').sort({ publishedAt: -1 }).find()
);

// Filter posts by tag
const filteredPosts = computed(() => {
  return posts.value.filter(post => 
    post.tags && post.tags.some(tag => tag.toLowerCase() === currentTag)
  );
});

// Format date to a readable format
const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en', options);
};

// Get all unique tags from blog posts
const getAllTags = (posts) => {
  const allTags = posts.flatMap(post => post.tags || []);
  return [...new Set(allTags)];
};

// Set page metadata
useHead({
  title: `Posts tagged with ${currentTag} - SitefinitySteve Blog`,
  meta: [
    { 
      name: 'description', 
      content: `Blog posts tagged with ${currentTag} - Tutorials, Rants, Coding, Sitefinity, Javascript, and more.` 
    }
  ]
});
</script>

<style lang="scss" scoped>
.blog {
  /* Add your styles here */
}
</style> 