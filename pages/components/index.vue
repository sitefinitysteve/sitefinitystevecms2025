<template>
  <section class="components">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h1>Free Sitefinity Component Library</h1>
        <p class="text-xl mt-4">Buff up your Sitefinity toolbox with our widgets 💪</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="widget in widgets.filter(w => !w.isSpecial)" :key="widget.title" 
             class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div class="p-6">
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-teal-500 to-blue-500">
              <component :is="widget.icon" class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-center mb-3">{{ widget.title }}</h3>
            <p class="text-gray-600 text-center">{{ widget.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Special "Explore More" widget -->
      <div v-if="widgets.some(w => w.isSpecial)" class="mt-12 max-w-2xl mx-auto">
        <div class="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 text-white">
          <div class="p-8 text-center">
            <div class="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
              <component :is="widgets.find(w => w.isSpecial).icon" class="h-10 w-10 text-white" />
            </div>
            <h3 class="text-2xl font-bold mb-4">{{ widgets.find(w => w.isSpecial).title }}</h3>
            <p class="text-lg mb-6">{{ widgets.find(w => w.isSpecial).description }}</p>
            <NavigationButton 
              variant="secondary" 
              size="lg"
              class="bg-teal-600 text-white hover:bg-gray-100"
              @click="navigateTo('https://github.com/sitefinitysteve/RandomSiteControls')"
            >
              View on GitHub
            </NavigationButton>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <NavigationButton 
          variant="primary" 
          size="lg" 
          class="mr-2"
          @click="navigateTo('https://www.progress.com/sitefinity-cms/marketplace/add-ons/randomsitecontrolsmvc')"
        >Sitefinity Marketplace</NavigationButton>
        
        <NavigationButton 
          variant="primary" 
          size="lg" 
          class="mr-2"
          @click="navigateTo('https://rscdemo.sitefinitysteve.com/', true)"
        >Live Demos</NavigationButton>
      </div>
    </div>

    <!-- Redesigned Nativescript Plugins Section -->
    <div class="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <!-- Decorative elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="absolute inset-0 w-full h-full">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)" />
          </svg>
          <svg width="0" height="0">
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5" />
              </pattern>
            </defs>
          </svg>
        </div>
        <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
      </div>

      <div class="container relative mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">NATIVESCRIPT PLUGINS</h2>
          <div class="inline-block bg-black/30 backdrop-blur-sm rounded-lg px-6 py-3 text-white font-mono text-lg">
            <span class="typing">$ tns plugin add nativescript-auth0</span>
          </div>
        </div>

        <!-- Hexagon grid layout for plugins -->
        <div class="max-w-5xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <div v-for="plugin in plugins" :key="plugin.title" 
                 class="group relative aspect-square">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-full h-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110">
                  <!-- Hexagon shape with backdrop blur -->
                  <div class="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl"></div>
                  
                  <!-- Plugin logo and content -->
                  <div class="relative z-10 p-4 text-center">
                    <div class="bg-white/90 rounded-full p-3 w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                      <img :src="plugin.image + '.png'" :alt="plugin.title" class="max-h-12 max-w-12 object-contain" />
                    </div>
                    <h3 class="text-white font-medium text-sm md:text-base">{{ plugin.title }}</h3>
                    
                    <!-- Hover overlay with button -->
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button 
                        @click="navigateTo(plugin.link, true)"
                        class="bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium transform transition-transform duration-300 hover:scale-105"
                      >
                        View Plugin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-16">
          <NavigationButton 
            variant="secondary" 
            size="lg"
            class="hover:bg-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300"
            @click="navigateTo('https://nativescript.org/')"
          >
            Create a Mobile App
          </NavigationButton>
        </div>
      </div>
    </div>

    <!-- Redesigned ServiceStack Templates Section -->
    <div class="relative py-20 overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 40 10 M 10 0 L 10 40" fill="none" stroke="currentColor" stroke-width="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <div class="container relative mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-block mb-2">
            <span class="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Templates</span>
          </div>
          <h2 class="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">ServiceStack RestApi Templates</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            This is the fastest and best way to create a custom Sitefinity Service. Not MVC JsonResults, not Webforms Svc calls,
            <NavigationButton 
              variant="ghost" 
              size="sm"
              class="text-teal-600 font-semibold hover:text-teal-800"
              @click="navigateTo('https://servicestack.net/')"
            >ServiceStack</NavigationButton> is fully licensed by Sitefinity, leverage it!
          </p>
        </div>

        <!-- Modern Tab Interface -->
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <!-- Tab Navigation -->
          <div class="flex border-b">
            <button
              :class="[
                'px-6 py-4 font-medium text-base transition-all duration-200 focus:outline-none',
                currentTab === 'plain' 
                  ? 'text-teal-600 border-b-2 border-teal-500 font-semibold' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              ]"
              @click="currentTab = 'plain'"
            >
              <div class="flex items-center">
                <CodeBracketIcon class="h-5 w-5 mr-2" />
                Plain C#
              </div>
            </button>
            <button
              :class="[
                'px-6 py-4 font-medium text-base transition-all duration-200 focus:outline-none',
                currentTab === 'coderush' 
                  ? 'text-teal-600 border-b-2 border-teal-500 font-semibold' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              ]"
              @click="currentTab = 'coderush'"
            >
              <div class="flex items-center">
                <BoltIcon class="h-5 w-5 mr-2" />
                CodeRush Template
              </div>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Plain C# Tab -->
            <div v-if="currentTab === 'plain'" class="transition-opacity duration-300">
              <div class="relative">
                <!-- Code Editor Header -->
                <div class="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
                  <div class="flex items-center">
                    <div class="flex space-x-2 mr-4">
                      <div class="w-3 h-3 rounded-full bg-red-500"></div>
                      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span class="text-sm font-mono">ServiceStack.cs</span>
                  </div>
                  <div class="text-xs text-gray-400">Plain C# Template</div>
                </div>
                
                <!-- Gist Embed Container -->
                <div class="gist-container rounded-b-lg overflow-hidden" data-src="https://gist.github.com/sitefinitysteve/86e05160c2e2be5410dcc754549c272a.js">
                  <div class="p-4 bg-gray-800 text-white text-center">
                    <span class="animate-pulse">Loading Gist...</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 text-gray-600 text-sm">
                <p>This template provides a basic structure for creating ServiceStack API endpoints in Sitefinity.</p>
              </div>
            </div>
            
            <!-- CodeRush Tab -->
            <div v-if="currentTab === 'coderush'" class="transition-opacity duration-300">
              <div class="relative">
                <!-- Code Editor Header -->
                <div class="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
                  <div class="flex items-center">
                    <div class="flex space-x-2 mr-4">
                      <div class="w-3 h-3 rounded-full bg-red-500"></div>
                      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span class="text-sm font-mono">ServiceStackTemplate.cs</span>
                  </div>
                  <div class="text-xs text-gray-400">CodeRush Template</div>
                </div>
                
                <!-- Gist Embed Container -->
                <div class="gist-container rounded-b-lg overflow-hidden" data-src="https://gist.github.com/sitefinitysteve/d49c43830fb79d3179d7.js">
                  <div class="p-4 bg-gray-800 text-white text-center">
                    <span class="animate-pulse">Loading Gist...</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg">
                <div class="text-gray-700 mb-4 md:mb-0 md:mr-4">
                  <p class="font-medium">Supercharge your development with CodeRush</p>
                  <p class="text-sm mt-1">Use this template with CodeRush to quickly generate ServiceStack endpoints</p>
                </div>
                <NavigationButton 
                  variant="secondary" 
                  size="md"
                  class="bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-md"
                  @click="navigateTo('https://www.devexpress.com/products/coderush/')"
                >
                  Download CodeRush
                </NavigationButton>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Additional Resources -->
        <div class="mt-12 text-center">
          <p class="text-gray-600 mb-6">Want to learn more about ServiceStack integration with Sitefinity?</p>
          <NavigationButton 
            variant="primary" 
            size="lg"
            class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
            @click="navigateTo('https://www.progress.com/documentation/sitefinity-cms/for-developers-create-a-servicestack-web-service-in-sitefintiy-cms')"
          >
            View Examples on GitHub
          </NavigationButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import NavigationButton from '~/components/navigation/button.vue';
import { 
  Bars3Icon, 
  CodeBracketIcon, 
  DocumentTextIcon, 
  BoltIcon, 
  MapPinIcon, 
  MagnifyingGlassIcon, 
  EllipsisHorizontalIcon 
} from '@heroicons/vue/24/outline';

const currentTab = ref('plain');

// Function to load GitHub Gist embeds
onMounted(() => {
  loadGistEmbeds();
});

const loadGistEmbeds = async () => {
  const gistContainers = document.querySelectorAll('.gist-container');
  
  for (const container of gistContainers) {
    // Extract Gist ID
    const gistUrl = container.dataset.src;
    const gistIdMatch = gistUrl.match(/\/([a-zA-Z0-9]+)\.js$/);
    if (!gistIdMatch) continue;
    
    const gistId = gistIdMatch[1];
    
    try {
      // Fetch the Gist content using the GitHub API
      const response = await fetch(`https://api.github.com/gists/${gistId}`);
      const data = await response.json();
      
      if (!data || !data.files) {
        container.innerHTML = '<div class="p-4 bg-gray-800 text-white">Failed to load Gist</div>';
        continue;
      }
      
      // Get the first file in the Gist
      const filename = Object.keys(data.files)[0];
      const file = data.files[filename];
      
      // Create a code element with syntax highlighting (you might want to use a library like Prism.js or highlight.js)
      const codeElement = document.createElement('pre');
      codeElement.className = 'p-4 overflow-auto bg-gray-900 text-white rounded-b-lg';
      codeElement.style.maxHeight = '600px';
      
      const code = document.createElement('code');
      code.textContent = file.content;
      code.className = 'language-csharp'; // Adjust based on file type
      
      codeElement.appendChild(code);
      
      // Create header with filename
      const header = document.createElement('div');
      header.className = 'flex justify-between items-center p-2 bg-gray-800 text-white text-sm border-t border-gray-700';
      header.innerHTML = `
        <span>${filename}</span>
        <a href="${data.html_url}" target="_blank" class="text-blue-400 hover:text-blue-300">View on GitHub</a>
      `;
      
      // Clear container and append content
      container.innerHTML = '';
      container.appendChild(codeElement);
      container.appendChild(header);
      
      // If you're using a syntax highlighting library, initialize it here
      // For example: Prism.highlightElement(code);
    } catch (error) {
      console.error('Error loading Gist:', error);
      container.innerHTML = '<div class="p-4 bg-gray-800 text-white">Error loading Gist</div>';
    }
  }
};

// Watch for tab changes to reload gists when tab changes
watch(currentTab, (newTab) => {
  setTimeout(() => {
    loadGistEmbeds();
  }, 200);
});

// Updated widgets array without Twitter Feed and with Heroicons v2
const widgets = [
  {
    title: "Tabstrip",
    description:
      "Drag-Drop widgets into a native Bootstrap or kendo tabstrip. The only tabstrip component available for Sitefinity that allows hosting of any content",
    icon: Bars3Icon
  },
  {
    title: "Html Content Block",
    description:
      "Enter your content in a full-screen instance of VSCode in the browser, nothing to install, with intellisense and syntax highlighting. No content parsing, this thing is fast.",
    icon: CodeBracketIcon
  },
  {
    title: "Markdown Editor",
    description:
      "Enter content as markdown, get a live preview to the right as you enter it. Nothing is cleaner than markdown, definitely not wysiwyg editors which bloat markup.",
    icon: DocumentTextIcon
  },
  {
    title: "Page Title",
    description:
      "Drop on the top of a page to pull in the title automatically, or edit to change. Template is global so you can easily restyle site-wide without editing 1000 content blocks.",
    icon: BoltIcon
  },
  {
    title: "Google Maps",
    description:
      "Drag-Drop google map widget, with just about every option configurable in the designer",
    icon: MapPinIcon
  },
  {
    title: "Widget Finder",
    description:
      "Ever wanted to know which pages contain which widgets (even layouts)... then this is your jam.",
    icon: MagnifyingGlassIcon
  },
  {
    title: "Explore More Features",
    description:
      "Extension methods like .GetTags(), .GetImage(), .Live(), .Master(), and many more utilities to enhance your Sitefinity development experience.",
    icon: EllipsisHorizontalIcon,
    isSpecial: true
  },
];

const plugins = [
  {
    title: "Auth0",
    link: "https://www.npmjs.com/package/nativescript-auth0",
    image: "/images/components/auth0-logo-blue",
  },
  {
    title: "Contacts",
    link: "https://www.npmjs.com/package/nativescript-contacts",
    image: "/images/components/appleandroid",
  },
  {
    title: "Google Analytics",
    link: "https://www.npmjs.com/package/nativescript-google-analytics",
    image: "/images/components/ga-logo",
  },
  {
    title: "Kiip",
    link: "https://www.npmjs.com/package/nativescript-kiip",
    image: "/images/components/Kiip_logo_image",
  },
  {
    title: "Zendesk",
    link: "https://www.npmjs.com/package/nativescript-zendesk",
    image: "/images/components/Zendesk_logo_RGB",
  },
  {
    title: "Launchkit",
    link: "https://www.npmjs.com/package/nativescript-launchkit",
    image: "/images/components/launchkit",
  },
  {
    title: "Shatterview",
    link: "https://www.npmjs.com/package/nativescript-shatterview",
    image: "/images/components/green-android-logo",
  },
];

// Function to handle navigation
const navigateTo = (url, openInNewTab = false) => {
  if (openInNewTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
};

// Define meta information for the page
useHead({
  title: 'Components - SitefinitySteve',
  meta: [
    { name: 'description', content: 'Plugins, widgets, and scripts created by SitefinitySteve' },
    { property: 'og:title', content: 'Components by SitefinitySteve' },
    { property: 'og:description', content: 'Plugins, widgets, and scripts created by SitefinitySteve' },
    { property: 'og:image', content: 'https://www.sitefinitysteve.com/images/uploads/homepage-hero.jpeg' },
  ],
});
</script>

<style lang="scss">
.components {
  h1, h2, h3 {
    margin-bottom: 0.5em;
  }
  
  pre {
    font-family: monospace;
    font-size: 0.9em;
    line-height: 1.4;
  }
  
  // GitHub Gist styling
  .gist-container {
    .gist {
      margin: 0 !important;
      
      .gist-file {
        margin-bottom: 0 !important;
        border-radius: 0 0 0.5rem 0.5rem !important;
        border: none !important;
      }
      
      .gist-data {
        border-radius: 0 !important;
      }
      
      .gist-meta {
        display: none !important;
      }
    }
  }
}
</style> 