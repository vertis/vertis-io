<script lang="ts">
  import { navigation } from '$lib/config';
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="bg-white shadow-sm relative z-50">
  <div class="border-b border-gray-200">
    <div class="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="flex items-center justify-between h-20 xl:h-24">
        <a href="/" class="text-xl font-bold text-ink-dark">
          vertis.io
        </a>

        <!-- Desktop navigation -->
        <nav class="hidden md:flex items-center space-x-8 xl:space-x-12" aria-label="Main">
          {#each navigation as link}
            <a
              href={link.href}
              class="text-base xl:text-lg font-medium text-ink-light hover:text-ink-dark transition-colors duration-200"
            >
              {link.name}
            </a>
          {/each}
        </nav>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button
            type="button"
            on:click={toggleMenu}
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
          >
            <span class="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {#if isMenuOpen}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            {:else}
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
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu backdrop -->
  {#if isMenuOpen}
    <div 
      class="fixed inset-0 bg-gray-800/20 backdrop-blur-sm transition-opacity duration-300 md:hidden"
      style="top: 80px"
      on:click={toggleMenu}
    ></div>
  {/if}

  <!-- Mobile menu -->
  <div 
    class="fixed inset-x-0 top-20 transform transition-all duration-300 ease-in-out md:hidden bg-white border-b border-gray-200 shadow-lg"
    class:translate-y-0={isMenuOpen}
    class:translate-y-[-100%]={!isMenuOpen}
    class:opacity-100={isMenuOpen}
    class:opacity-0={!isMenuOpen}
  >
    <div class="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 space-y-1">
      {#each navigation as link}
        <a
          href={link.href}
          class="block px-3 py-2.5 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
          on:click={toggleMenu}
        >
          {link.name}
        </a>
      {/each}
    </div>
  </div>
</header>
