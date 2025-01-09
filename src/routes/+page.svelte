<script lang="ts">
  import { siteConfig } from '$lib/config';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/posts';

  export let data: PageData;
</script>

<main class="min-h-screen bg-paper">
  <div class="border-b border-gray-100 bg-paper">
    <div class="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 xl:py-24">
      <div class="text-center">
        <h1 class="font-serif text-6xl xl:text-7xl tracking-tight">
          <span class="block xl:inline">Hello, I'm</span>
          <span class="block bg-gradient-to-b from-ink-dark to-ink bg-clip-text text-transparent xl:inline">{siteConfig.author.name}</span>
        </h1>
        <p class="mt-6 text-xl xl:text-2xl text-ink max-w-4xl mx-auto leading-relaxed">
          {siteConfig.author.bio}
        </p>
      </div>
    </div>
  </div>
  
  <div class="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 xl:py-24">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
      <!-- Recent Posts -->
      <div>
        <h3 class="font-serif text-2xl xl:text-3xl text-ink-dark border-b border-gray-100 pb-4 mb-6">Recent</h3>
        <ul class="text-ink text-base xl:text-lg flex flex-col gap-4">
          {#each data.recentPosts as post}
            <li class="flex items-center gap-3 group">
              {#if post.feature_image}
                <img
                  class="w-16 h-16 flex-shrink-0 object-cover rounded-lg shadow-sm"
                  src={post.feature_image.preview_url}
                  alt=""
                />
              {/if}
              <a href="/blog/{post.slug}" class="group-hover:text-ink-dark transition-colors duration-300">
                {post.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Popular Posts -->
      <div>
        <h3 class="font-serif text-2xl xl:text-3xl text-ink-dark border-b border-gray-100 pb-4 mb-6">Popular</h3>
        <ul class="text-ink text-base xl:text-lg flex flex-col gap-4">
          {#each data.popularPosts as post}
            <li class="flex items-center gap-3 group">
              {#if post.feature_image}
                <img
                  class="w-16 h-16 flex-shrink-0 object-cover rounded-lg shadow-sm"
                  src={post.feature_image.preview_url}
                  alt=""
                />
              {/if}
              <a href="/blog/{post.slug}" class="group-hover:text-ink-dark transition-colors duration-300">
                {post.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Notable Posts -->
      <div>
        <h3 class="font-serif text-2xl xl:text-3xl text-ink-dark border-b border-gray-100 pb-4 mb-6">Notable</h3>
        <ul class="text-ink text-base xl:text-lg flex flex-col gap-4">
          {#each data.notablePosts as post}
            <li class="flex items-center gap-3 group">
              {#if post.feature_image}
                <img
                  class="w-16 h-16 flex-shrink-0 object-cover rounded-lg shadow-sm"
                  src={post.feature_image.preview_url}
                  alt=""
                />
              {/if}
              <a href="/blog/{post.slug}" class="group-hover:text-ink-dark transition-colors duration-300">
                {post.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <!-- Quote Section -->
  <section class="border-t border-gray-100 bg-paper">
    <div class="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 xl:py-24">
      <blockquote>
        <div class="max-w-4xl mx-auto text-center font-serif text-2xl xl:text-3xl leading-relaxed text-ink-dark">
          <p>
            "The best way to be superhuman is to do things that you love with other people who love them, too. The only way to do that is to admit you're doing it because you love it and if you do more than everyone, you're still only doing that because that's what you choose."
          </p>
        </div>
        <footer class="mt-8">
          <div class="flex items-center justify-center gap-4">
            <div class="flex-shrink-0">
              <img
                class="h-12 w-12 rounded-full shadow-sm"
                src="https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/9db4bdc0-55a2-496f-c460-20cbde178900/w=200"
                alt="Cory Doctorow"
              />
            </div>
            <div class="flex items-center gap-2">
              <div class="text-lg xl:text-xl font-serif text-ink-dark">Cory Doctorow</div>
              <svg class="h-5 w-5 text-ink-light" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 0h3L9 20H6l5-20z" />
              </svg>
              <div class="text-lg xl:text-xl font-serif text-ink-light">Walkaway</div>
            </div>
          </div>
        </footer>
      </blockquote>
    </div>
  </section>
</main>
