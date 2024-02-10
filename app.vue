<script setup lang="ts">
const isCelcius = ref(false);
</script>

<template>
  <main class="gray-100 container mx-auto h-screen max-w-4xl p-5">
    <div
      class="space-between justify-content flex w-full flex-wrap items-center gap-4 md:flex-nowrap md:justify-normal md:gap-0"
    >
      <img src="/images/logo.svg" alt="Just Weather Logo" class="mx-auto h-7 w-full md:ml-auto md:mr-0 md:w-auto" />
      <div class="mx-auto flex w-full max-w-lg grow items-center gap-4">
        <Search class="grow" />
        <Toggle v-model="isCelcius" class="flex-shrink-0" />
      </div>
    </div>
  </main>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
