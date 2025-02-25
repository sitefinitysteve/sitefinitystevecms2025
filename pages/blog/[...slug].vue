<template>
  <div class="blog-post">
    <ContentDoc v-slot="{ doc }">
      <div class="blog-post-header">
        <h1>{{ doc.title }}</h1>
        <p class="date" v-if="doc.publishedAt">{{ formatDate(doc.publishedAt) }}</p>
      </div>
      <div class="blog-post-content">
        <!-- For JSON content, we need to render the content field directly -->
        <div v-if="doc.content" v-html="renderContent(doc.content)"></div>
        <!-- For Markdown content, use ContentRenderer -->
        <ContentRenderer v-else :value="doc" />
      </div>
      <div class="blog-post-footer">
        <NuxtLink to="/blog" class="back-to-blog">← Back to Blog</NuxtLink>
      </div>
    </ContentDoc>
  </div>
</template>

<script setup>
import { marked } from 'marked';

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
</script>

<style lang="scss" scoped>
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-post-header {
  margin-bottom: 2rem;
  
  h1 {
    margin-bottom: 0.5rem;
  }
  
  .date {
    font-size: 0.9rem;
    color: #666;
  }
}

.blog-post-content {
  line-height: 1.6;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  img {
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
  }
  
  h2, h3, h4 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  code {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
  }
}

.blog-post-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaeaea;
  
  .back-to-blog {
    display: inline-block;
    color: #0066cc;
    font-weight: bold;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style> 