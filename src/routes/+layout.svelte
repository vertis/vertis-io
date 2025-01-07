<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import "../app.css";
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-1">
    <slot />
  </main>
  <Footer />
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
