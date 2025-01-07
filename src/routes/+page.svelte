<script lang="ts">
  import { siteConfig } from '$lib/config';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/posts';

  export let data: PageData;
</script>

<main class="mt-16 px-4 sm:mt-24">
  <div class="text-center mx-auto max-w-5xl">
    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
      <span class="block xl:inline">Hello, I'm</span>
      <span class="block text-cyan-400 xl:inline">{siteConfig.author.name}</span>
    </h1>
    <p class="mt-3 max-w-4xl mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-4xl prose-cyan">
      {siteConfig.author.bio}
    </p>
  </div>
  
  <div class="relative mt-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Recent Posts -->
        <div>
          <h3 class="text-xl font-semibold border-b border-gray-300 mb-4">Recent</h3>
          <ul class="text-gray-600 text-sm flex flex-col gap-2">
            {#each data.recentPosts as post}
              <li class="flex items-center gap-2">
                {#if post.feature_image}
                  <img
                    class="w-12 h-12 flex-shrink-0 object-cover inline-block rounded"
                    src={post.feature_image.preview_url}
                    alt=""
                  />
                {/if}
                <a href="/blog/{post.slug}" class="hover:underline">
                  {post.title}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Popular Posts -->
        <div>
          <h3 class="text-xl font-semibold border-b border-gray-300 mb-4">Popular</h3>
          <ul class="text-gray-600 text-sm flex flex-col gap-2">
            {#each data.popularPosts as post}
              <li class="flex items-center gap-2">
                {#if post.feature_image}
                  <img
                    class="w-12 h-12 flex-shrink-0 object-cover inline-block rounded"
                    src={post.feature_image.preview_url}
                    alt=""
                  />
                {/if}
                <a href="/blog/{post.slug}" class="hover:underline">
                  {post.title}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Notable Posts -->
        <div>
          <h3 class="text-xl font-semibold border-b border-gray-300 mb-4">Notable</h3>
          <ul class="text-gray-600 text-sm flex flex-col gap-2">
            {#each data.notablePosts as post}
              <li class="flex items-center gap-2">
                {#if post.feature_image}
                  <img
                    class="w-12 h-12 flex-shrink-0 object-cover inline-block rounded"
                    src={post.feature_image.preview_url}
                    alt=""
                  />
                {/if}
                <a href="/blog/{post.slug}" class="hover:underline">
                  {post.title}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Quote Section -->
  <section class="py-12 overflow-hidden md:py-20 lg:py-24">
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <blockquote class="mt-10">
        <div class="max-w-4xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
          <p>
            "The best way to be superhuman is to do things that you love with other people who love them, too. The only way to do that is to admit you're doing it because you love it and if you do more than everyone, you're still only doing that because that's what you choose."
          </p>
        </div>
        <footer class="mt-8">
          <div class="md:flex md:items-center md:justify-center">
            <div class="md:flex-shrink-0">
              <img
                class="mx-auto h-10 w-10 rounded-full"
                src="https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/9db4bdc0-55a2-496f-c460-20cbde178900/w=200"
                alt="Cory Doctorow"
              />
            </div>
            <div class="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
              <div class="text-base font-medium text-gray-900">Cory Doctorow</div>
              <svg class="hidden md:block mx-1 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 0h3L9 20H6l5-20z" />
              </svg>
              <div class="text-base font-medium text-gray-500">Walkaway</div>
            </div>
          </div>
        </footer>
      </blockquote>
    </div>
  </section>
</main>
