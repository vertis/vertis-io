<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">Test Page</h1>

  {#if data.post.error}
    <div class="mb-8">
      <h2 class="text-xl text-red-600 font-bold">Error:</h2>
      <pre class="bg-red-100 p-4 rounded mt-2 whitespace-pre-wrap overflow-auto">
        {data.post.error}
      </pre>
    </div>
  {/if}

  {#if data.post.path}
    <div class="mb-8">
      <h2 class="text-xl font-bold">File Path:</h2>
      <pre class="bg-gray-100 p-4 rounded mt-2">
        {data.post.path}
      </pre>
    </div>
  {/if}

  {#if data.post.metadata}
    <div class="mb-8">
      <h2 class="text-xl font-bold">Metadata:</h2>
      <pre class="bg-gray-100 p-4 rounded mt-2">
        {JSON.stringify(data.post.metadata, null, 2)}
      </pre>
    </div>
  {/if}

  {#if data.post.content}
    <div class="mb-8">
      <h2 class="text-xl font-bold">Content:</h2>
      <pre class="bg-gray-100 p-4 rounded mt-2 whitespace-pre-wrap overflow-auto">
        {JSON.stringify(data.post.content, null, 2)}
      </pre>
    </div>
  {/if}

  {#if data.post.raw}
    <div class="mb-8">
      <h2 class="text-xl font-bold">Raw Module:</h2>
      <pre class="bg-gray-100 p-4 rounded mt-2 whitespace-pre-wrap overflow-auto">
        {JSON.stringify(data.post.raw, null, 2)}
      </pre>
    </div>
  {/if}
</div>
