<script lang="ts">
  import { navigation } from '$lib/config';
</script>

<header class="bg-white shadow-sm">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div class="w-full py-6 flex items-center justify-between border-b border-gray-200">
      <div class="flex items-center">
        <a href="/" class="text-xl font-bold text-gray-900">
          vertis.io
        </a>
        <div class="hidden ml-10 space-x-8 lg:block">
          {#each navigation as link}
            <a
              href={link.href}
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {link.name}
            </a>
          {/each}
        </div>
      </div>
      <div class="lg:hidden">
        <button
          type="button"
          class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
        >
          <span class="sr-only">Open menu</span>
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
    <!-- Mobile menu -->
    <div class="lg:hidden">
      <div class="pt-2 pb-3 space-y-1">
        {#each navigation as link}
          <a
            href={link.href}
            class="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            {link.name}
          </a>
        {/each}
      </div>
    </div>
  </nav>
</header>
