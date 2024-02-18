<script setup lang="ts">
const props = defineProps({
  city: {
    type: String,
    required: true,
  },
  currentTemp: {
    type: Number,
    required: true,
  },
  lowTemp: {
    type: Number,
    required: true,
  },
  conditionIcon: {
    type: String,
    required: true,
  },
  conditionText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="space-between justify-content mx-auto flex w-full items-center gap-4 py-8">
    <div class="grow text-gray-900/85">
      <div class="text-4xl font-semibold">{{ city }}</div>
      <div class="text-6xl font-bold">
        <span class="inline-block">{{ formatTemp(currentTemp) }}</span>
        <span class="inline-block pl-4 text-gray-900/70">{{ formatTemp(lowTemp) }}</span>
      </div>
    </div>
    <div>
      <img :src="conditionIcon" :alt="conditionText" width="100" height="100" />
    </div>
  </div>
</template>
