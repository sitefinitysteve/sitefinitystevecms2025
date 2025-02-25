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

    <div class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2>ServiceStack RestApi templates</h2>
          <p class="text-xl mt-4">
            This is the fastest and best way to create a custom Sitefinity Service. Not MVC JsonResults, not Webforms Svc calls,
            <NavigationButton 
              variant="ghost" 
              size="sm"
              @click="navigateTo('https://servicestack.net/')"
            >ServiceStack</NavigationButton> is fully licensed by Sitefinity, leverage it!
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <div class="flex border-b mb-4">
            <button
              :class="currentTab === 'plain' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'"
              class="px-4 py-2 font-medium"
              @click="currentTab = 'plain'"
            >
              Plain C#
            </button>
            <button
              :class="currentTab === 'coderush' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'"
              class="px-4 py-2 font-medium"
              @click="currentTab = 'coderush'"
            >
              CodeRush Template
            </button>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg">
            <div v-if="currentTab === 'plain'">
              <pre class="overflow-auto p-4 bg-gray-800 text-white rounded">
// Plain C# ServiceStack template
public class HelloRequest : IReturn&lt;HelloResponse&gt;
{
    public string Name { get; set; }
}

public class HelloResponse
{
    public string Result { get; set; }
}

public class HelloService : Service
{
    public object Any(HelloRequest request)
    {
        return new HelloResponse { Result = "Hello, " + request.Name };
    }
}
              </pre>
            </div>
            <div v-if="currentTab === 'coderush'">
              <pre class="overflow-auto p-4 bg-gray-800 text-white rounded">
// CodeRush ServiceStack template
public class $NAME$Request : IReturn&lt;$NAME$Response&gt;
{
    $END$
}

public class $NAME$Response
{
    
}

public class $NAME$Service : Service
{
    public object Any($NAME$Request request)
    {
        return new $NAME$Response { };
    }
}
              </pre>
              <div class="mt-4 text-center">
                <NavigationButton 
                  variant="secondary" 
                  size="lg"
                  @click="navigateTo('https://www.devexpress.com/products/coderush/')"
                >Download CodeRush</NavigationButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
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
}
</style> 