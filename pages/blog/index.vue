<template>
  <div class="blog-page">
    <h1>Blog</h1>
    <div class="blog-posts">
      <ContentList path="/blog" v-slot="{ list }">
        <div v-for="article in list" :key="article._path" class="blog-post-card">
          <NuxtLink :to="article._path">
            <h2>{{ article.title }}</h2>
            <p class="date" v-if="article.publishedAt || article.date">
              {{ formatDate(article.publishedAt || article.date) }}
            </p>
            <p class="description">{{ article.seoDescription || article.description }}</p>
            <span class="read-more">Read more</span>
          </NuxtLink>
        </div>
      </ContentList>
    </div>
  </div>
</template>

<script setup>
// Format date to a readable format
const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en', options);
};
</script>

<style lang="scss" scoped>
.blog-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  h1 {
    margin-bottom: 2rem;
  }
}

.blog-posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.blog-post-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  a {
    display: block;
    padding: 1.5rem;
    color: inherit;
    text-decoration: none;
  }
  
  h2 {
    margin-top: 0;
    font-size: 1.5rem;
  }
  
  .date {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .description {
    margin-bottom: 1rem;
  }
  
  .read-more {
    display: inline-block;
    font-weight: bold;
    color: #0066cc;
  }
}
</style> 