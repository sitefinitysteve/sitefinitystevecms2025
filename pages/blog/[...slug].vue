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
import { onMounted, ref, nextTick } from 'vue';

// Format date to a readable format
const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en', options);
};

// Render markdown content from JSON
const renderContent = (content) => {
  if (!content) return '';
  
  // Create a temporary element to hold the content
  const tempElement = document.createElement('div');
  
  // First, extract all embeddedscript elements to preserve them
  const embeddedScriptRegex = /<div\s+class=['"]embeddedscript['"][^>]*data-src=['"]([^'"]+)['"][^>]*><\/div>/g;
  const embeddedScripts = [];
  let match;
  
  // Replace embeddedscript elements with placeholders
  let processedContent = content.replace(embeddedScriptRegex, (match, dataSrc, offset) => {
    const placeholder = `EMBEDDED_SCRIPT_PLACEHOLDER_${embeddedScripts.length}`;
    embeddedScripts.push({ placeholder, html: match });
    return placeholder;
  });
  
  // Render markdown
  const renderedContent = marked(processedContent);
  
  // Restore embeddedscript elements
  let finalContent = renderedContent;
  embeddedScripts.forEach(script => {
    finalContent = finalContent.replace(script.placeholder, script.html);
  });
  
  return finalContent;
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

// Function to load GitHub Gist embeds
onMounted(() => {
  // Wait for the content to be rendered
  nextTick(() => {
    loadEmbeddedGists();
    
    // Load Prism.js for syntax highlighting if it's not already loaded
    if (!window.Prism) {
      loadPrismJs();
    }
  });
});

// Function to load Prism.js dynamically
const loadPrismJs = () => {
  // Create and load Prism CSS
  const prismCss = document.createElement('link');
  prismCss.rel = 'stylesheet';
  prismCss.href = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css';
  document.head.appendChild(prismCss);
  
  // Create and load Prism JS
  const prismJs = document.createElement('script');
  prismJs.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js';
  prismJs.async = true;
  prismJs.onload = () => {
    // Load additional languages
    const languages = [
      'csharp', 'javascript', 'css', 'markup', 'bash', 'json', 'sql', 'typescript', 'scss'
    ];
    
    languages.forEach(lang => {
      const script = document.createElement('script');
      script.src = `https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-${lang}.min.js`;
      script.async = true;
      document.head.appendChild(script);
    });
    
    // Initialize Prism on any existing code blocks
    if (window.Prism) {
      setTimeout(() => {
        window.Prism.highlightAll();
      }, 500);
    }
  };
  
  document.head.appendChild(prismJs);
};

const loadEmbeddedGists = async () => {
  // Find all embedded script elements
  const embeddedScripts = document.querySelectorAll('.embeddedscript');
  
  for (const container of embeddedScripts) {
    // Extract Gist URL and optional file parameter
    const gistUrl = container.dataset.src;
    if (!gistUrl) continue;
    
    // Extract Gist ID and file parameter if present
    const gistIdMatch = gistUrl.match(/\/([a-zA-Z0-9]+)\.js/);
    if (!gistIdMatch) continue;
    
    const gistId = gistIdMatch[1];
    
    // Check if a specific file is requested
    const fileParam = new URL(gistUrl, 'https://example.com').searchParams.get('file');
    
    try {
      // Fetch the Gist content using the GitHub API
      const response = await fetch(`https://api.github.com/gists/${gistId}`);
      const data = await response.json();
      
      if (!data || !data.files) {
        container.innerHTML = '<div class="p-4 bg-gray-100 text-gray-800 rounded">Failed to load Gist</div>';
        continue;
      }
      
      // Get the requested file or the first file if no specific file is requested
      let filename = fileParam;
      let file;
      
      if (filename && data.files[filename]) {
        file = data.files[filename];
      } else {
        // If the specific file wasn't found or no file was specified, use the first file
        filename = Object.keys(data.files)[0];
        file = data.files[filename];
      }
      
      // Determine language for syntax highlighting
      const fileExtension = filename.split('.').pop().toLowerCase();
      let language = 'plaintext';
      
      // Map common file extensions to languages
      const languageMap = {
        'js': 'javascript',
        'ts': 'typescript',
        'html': 'html',
        'css': 'css',
        'scss': 'scss',
        'cs': 'csharp',
        'php': 'php',
        'py': 'python',
        'rb': 'ruby',
        'java': 'java',
        'json': 'json',
        'xml': 'xml',
        'md': 'markdown',
        'sql': 'sql'
      };
      
      language = languageMap[fileExtension] || 'plaintext';
      
      // Create a code element with syntax highlighting
      const codeElement = document.createElement('pre');
      codeElement.className = 'overflow-auto bg-gray-50 text-gray-800 rounded p-4 my-4';
      codeElement.style.maxHeight = '500px';
      
      const code = document.createElement('code');
      code.textContent = file.content;
      code.className = `language-${language}`;
      
      codeElement.appendChild(code);
      
      // Create header with filename
      const header = document.createElement('div');
      header.className = 'flex justify-between items-center p-2 bg-gray-200 text-gray-800 text-sm rounded-t';
      header.innerHTML = `
        <span class="font-mono">${filename}</span>
        <a href="${data.html_url}" target="_blank" class="text-teal-600 hover:text-teal-800">View on GitHub</a>
      `;
      
      // Create container for the gist
      const gistContainer = document.createElement('div');
      gistContainer.className = 'gist-embed border border-gray-200 rounded shadow-sm my-6';
      gistContainer.appendChild(header);
      gistContainer.appendChild(codeElement);
      
      // Clear container and append content
      container.innerHTML = '';
      container.appendChild(gistContainer);
      
      // Apply syntax highlighting with Prism if available
      if (window.Prism) {
        setTimeout(() => {
          window.Prism.highlightElement(code);
        }, 100);
      }
    } catch (error) {
      console.error('Error loading Gist:', error);
      container.innerHTML = '<div class="p-4 bg-gray-100 text-gray-800 rounded">Error loading Gist</div>';
    }
  }
};
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
  
  code {
    background-color: #f3f4f6;
    border-radius: 0.25em;
    padding: 0.2em 0.4em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.875em;
    color: #374151;
    border: 1px solid #e5e7eb;
  }
  
  pre code {
    background-color: transparent;
    border-radius: 0;
    padding: 0;
    border: none;
    font-size: 0.9em;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Styles for embedded gists */
  .gist-embed {
    margin: 1.5rem 0;
    
    pre {
      margin: 0;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.9em;
      line-height: 1.5;
    }
    
    code {
      display: block;
      padding: 0;
      background-color: transparent;
      white-space: pre;
      overflow-x: auto;
    }
  }
  
  /* Loading state for embeddedscript elements */
  .embeddedscript:empty::before {
    content: "Loading code snippet...";
    display: block;
    padding: 1rem;
    text-align: center;
    background-color: #f3f4f6;
    border-radius: 0.375em;
    color: #6b7280;
    font-style: italic;
  }
}
</style> 