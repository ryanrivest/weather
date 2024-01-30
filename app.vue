<script setup lang="ts">
  // This should be proxied
  const { data } = await useFetch('/api/search.json?q=97402', { server: true })
</script>

<template>
  <div v-if="data">
    Data: {{ data }}
  </div>
  <a href="/api/search.json?q=97402" target="_blank">
    To the Endpoint
  </a>

  <div>
    <NuxtWelcome />
  </div>
</template>
