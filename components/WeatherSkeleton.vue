<script setup lang="ts">
const items = ref([1, 2, 3, 4, 5, 6, 7, 8]);
</script>

<template>
  <div class="animate-pulse">
    <div class="space-between justify-content mx-auto flex w-full items-center gap-4 py-8">
      <div class="grow">
        <div class="inline-block h-10 w-36 rounded-md bg-gray-300"></div>
        <div>
          <span class="inline-block h-14 w-48 rounded-md bg-gray-300"></span>
        </div>
      </div>
      <div>
        <div class="inline-block h-24 w-24 rounded-md bg-gray-300"></div>
      </div>
    </div>
    <div class="rounded-xl bg-gray-200 p-4 pr-0">
      <div class="inline-block h-8 w-32 bg-gray-300"></div>
      <div class="flex gap-4 overflow-x-scroll py-4">
        <div v-for="item in items" :key="item" class="inline-block w-28 rounded-lg bg-gray-100 px-4 py-2 text-center">
          <div class="inline-block h-6 w-20 rounded-sm bg-gray-300"></div>
          <div>
            <div class="inline-block h-8 w-8 rounded-sm bg-gray-300"></div>
          </div>
          <div class="inline-block h-6 w-6 rounded-sm bg-gray-300 font-bold"></div>
        </div>
      </div>
    </div>
    <div class="my-6 rounded-xl bg-gray-200 p-4">
      <div class="inline-block h-8 w-32 bg-gray-300"></div>
      <div class="grid grid-cols-2 gap-4 py-4 md:grid-cols-4">
        <div v-for="item in items" :key="item" class="relative rounded-lg bg-gray-100 px-4 py-2">
          <div><div class="inline-block h-6 w-16 rounded-sm bg-gray-300"></div></div>
          <div><div class="inline-block h-6 w-20 rounded-sm bg-gray-300"></div></div>
          <div class="absolute right-5 top-1/3 inline-block h-6 w-6 rounded-sm bg-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>
