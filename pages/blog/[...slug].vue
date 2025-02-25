<template>
  <div class="post">
    <ContentDoc v-slot="{ doc }">
      <article class="xl:divide-y xl:divide-gray-200 mx-10 lg:mx-20">
        <header class="pt-6 xl:pb-10">
          <div class="space-y-1 text-center">
            <dl class="space-y-10">
              <div>
                <dt class="sr-only">Published on</dt>
                <dd class="text-base leading-6 font-medium text-gray-500 mb-3">
                  <time :datetime="doc.publishedAt">{{ formatDate(doc.publishedAt) }}</time>
                </dd>
              </div>
            </dl>
            <div>
              <h1 class="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {{ doc.title }}
              </h1>
            </div>
          </div>
        </header>
        
        <div class="divide-y xl:divide-y-0 divide-gray-200 xl:grid xl:grid-cols-4 xl:col-gap-6 pb-8 xl:pb-10" style="grid-template-rows:auto 1fr">
          <dl class="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200">
            <dt class="sr-only">Authors</dt>
            <dd>
              <ul class="flex justify-center xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8">
                <li class="flex items-center space-x-2">
                  <img src="https://pbs.twimg.com/profile_images/1630627663311192076/arxUvMn2_normal.jpg" 
                       alt="Twitter Avatar" 
                       loading="lazy" 
                       class="w-10 h-10 rounded-full" />
                  <dl class="text-sm font-medium leading-5 whitespace-no-wrap">
                    <dt class="sr-only">Name</dt>
                    <dd class="text-gray-900">Steve McNiven</dd>
                    <dt class="sr-only">Twitter</dt>
                    <dd>
                      <a href="https://twitter.com/@stevemcniven" 
                         class="text-teal-500 hover:text-teal-600">@stevemcniven</a>
                    </dd>
                  </dl>
                </li>
              </ul>
            </dd>
          </dl>
          
          <div class="divide-y divide-gray-200 xl:pb-0 xl:col-span-3 xl:row-span-2 xl:pl-6">
            <div class="prose max-w-none pt-10 pb-8">
              <div id="post-content" class="post__content markdown pt-4 md:pt-6 md:pb-24">
                <!-- For JSON content, we need to render the content field directly -->
                <div v-if="typeof doc.content === 'string'" v-html="renderContent(doc.content)"></div>
                <!-- For Markdown content, use ContentRenderer -->
                <ContentRenderer v-else :value="doc" />
              </div>
            </div>
          </div>
          
          <footer class="text-sm font-medium leading-5 divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
            <div class="space-y-8 py-8">
              <div v-if="nextArticle">
                <h2 class="text-xs tracking-wide uppercase text-gray-500">Next Article</h2>
                <div class="text-teal-500 hover:text-teal-600">
                  <NuxtLink :to="nextArticle._path">{{ nextArticle.title }}</NuxtLink>
                </div>
              </div>
              
              <div v-if="prevArticle">
                <h2 class="text-xs tracking-wide uppercase text-gray-500">Previous Article</h2>
                <div class="text-teal-500 hover:text-teal-600">
                  <NuxtLink :to="prevArticle._path">{{ prevArticle.title }}</NuxtLink>
                </div>
              </div>
              
              <div>
                <h2 class="text-xs tracking-wide uppercase text-gray-500">Top Posts</h2>
                <div class="text-teal-500 hover:text-teal-600">
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
                </div>
              </div>
            </div>
            
            <div class="pt-8">
              <NuxtLink class="text-teal-500 hover:text-teal-600" to="/blog">← Back to the blog</NuxtLink>
            </div>
          </footer>
        </div>
      </article>
      
      <div class="bg-teal-700 mb-8">
        <div class="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span class="block">Boost your online presence.</span>
          </h2>
          <p class="mt-4 text-lg leading-6 text-indigo-200">Let us create the perfect digital experience for your company.</p>
          <NuxtLink to="/contact" class="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-600 hover:bg-indigo-50 sm:w-auto">Contact us now</NuxtLink>
        </div>
      </div>
    </ContentDoc>
  </div>
</template>

<script setup>
import { marked } from 'marked';
import { useAsyncData } from 'nuxt/app';
import { useRoute } from 'vue-router';

// Format date to a readable format
const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en', options);
};

// Render markdown content from JSON
const renderContent = (content) => {
  if (!content) return '';
  return marked(content);
};

// Get the current route
const route = useRoute();

// Get next and previous articles
const { data: allPosts } = await useAsyncData('all-posts', () => queryContent('/blog').sort({ publishedAt: -1 }).find());

// Find current post index
const currentPath = route.path;
const currentIndex = allPosts.value.findIndex(post => post._path === currentPath);

// Get next and previous articles
const nextArticle = currentIndex > 0 ? allPosts.value[currentIndex - 1] : null;
const prevArticle = currentIndex < allPosts.value.length - 1 ? allPosts.value[currentIndex + 1] : null;
</script>

<style lang="scss" scoped>
.post {
  /* Add your styles here */
}

:deep(.prose) {
  max-width: none;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  
  p {
    margin-bottom: 1.25em;
  }
  
  pre {
    padding: 1em;
    border-radius: 0.375em;
    background-color: #f3f4f6;
    overflow-x: auto;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
}
</style> 