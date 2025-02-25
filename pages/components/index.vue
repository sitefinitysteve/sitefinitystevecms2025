<template>
  <section class="components">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h1>Free Sitefinity Component Library</h1>
        <p class="text-xl mt-4">Buff up your Sitefinity toolbox with our widgets 💪</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="widget in widgets" :key="widget.title" class="p-6 bg-white rounded-lg shadow-md">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h4 class="text-lg font-medium">{{ widget.title }}</h4>
              <p class="mt-2">{{ widget.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <a
          href="https://www.progress.com/sitefinity-cms/marketplace/add-ons/randomsitecontrolsmvc"
          class="inline-block px-6 py-3 bg-orange-400 hover:bg-orange-600 text-white font-medium rounded-md transition duration-150 mr-2"
        >Sitefinity Marketplace</a>
        <a
          href="https://rscdemo.sitefinitysteve.com/"
          target="_blank"
          class="inline-block px-6 py-3 bg-orange-400 hover:bg-orange-600 text-white font-medium rounded-md transition duration-150 mr-2"
        >Live Demos</a>
      </div>
    </div>

    <div class="bg-gray-100 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2>Nativescript Plugins</h2>
          <p class="text-xl mt-4">
            <span class="typing">$ tns plugin add nativescript-auth0</span>
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-8 mb-16">
          <div v-for="plugin in plugins" :key="plugin.title" class="w-1/2 md:w-1/4 p-2 text-center">
            <a :title="plugin.title" :href="plugin.link">
              <img :src="plugin.image + '.png'" :alt="plugin.title" class="mx-auto h-16 object-contain" />
            </a>
          </div>
        </div>

        <div class="text-center">
          <a
            href="https://nativescript.org/"
            class="inline-block px-6 py-3 bg-orange-600 hover:bg-teal-500 text-white font-medium rounded-md transition duration-150"
          >Create a mobile app</a>
        </div>
      </div>
    </div>

    <div class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2>ServiceStack RestApi templates</h2>
          <p class="text-xl mt-4">
            This is the fastest and best way to create a custom Sitefinity Service. Not MVC JsonResults, not Webforms Svc calls,
            <a href="https://servicestack.net/" class="text-teal-600 hover:underline">ServiceStack</a> is fully licensed by Sitefinity, leverage it!
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
                <a
                  href="https://www.devexpress.com/products/coderush/"
                  class="inline-block px-6 py-3 bg-orange-600 hover:bg-teal-500 text-white font-medium rounded-md transition duration-150"
                >Download CodeRush</a>
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

const currentTab = ref('plain');

const widgets = [
  {
    title: "Tabstrip",
    description:
      "Drag-Drop widgets into a native Bootstrap or kendo tabstrip. The only tabstrip component available for Sitefinity that allows hosting of any content",
  },
  {
    title: "Html Content Block",
    description:
      "Enter your content in a full-screen instance of VSCode in the browser, nothing to install, with intellisense and syntax highlighting. No content parsing, this thing is fast.",
  },
  {
    title: "Markdown Editor",
    description:
      "Enter content as markdown, get a live preview to the right as you enter it. Nothing is cleaner than markdown, definitely not wysiwyg editors which bloat markup.",
  },
  {
    title: "Page Title",
    description:
      "Drop on the top of a page to pull in the title automatically, or edit to change. Template is global so you can easily restyle site-wide without editing 1000 content blocks.",
  },
  {
    title: "Twitter Feed",
    description:
      "Uses the twitter API to pull in content, Sitefinity removed twitter integration back around v11, I brought it back (but better)",
  },
  {
    title: "Google Maps",
    description:
      "Drag-Drop google map widget, with just about every option configurable in the designer",
  },
  {
    title: "Widget Finder",
    description:
      "Ever wanted to know which pages contain which widgets (even layouts)... then this is your jam.",
  },
  {
    title: "And more...",
    description:
      "Extension methods like .GetTags(), .GetImage(), .Live(), .Master(), or just want images or docs in a ContentBlock to render with the ImageDoc .cshtml views, there's tons here",
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