<script setup lang="ts">
function reload() {
  location.reload();
}
</script>

<template>
  <div class="text-center text-gray-900">
    <img src="/images/cloud-error-illustration.svg" alt="Error" class="w-75 mx-auto" />
    <div class="pb-4 pt-8 text-4xl font-semibold">Oh no!</div>
    <div class="pb-2 text-sm uppercase">Something went wrong.</div>
    <a
      class="inline-block cursor-pointer rounded-full bg-indigo-400 px-4 py-2 text-white hover:bg-indigo-500"
      @click="reload"
    >
      Refresh page
    </a>
  </div>
</template>
