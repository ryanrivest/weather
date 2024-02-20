<script setup lang="ts">
import { Switch } from '@headlessui/vue';

const prefersCelcius = defineModel({ default: false, type: Boolean });
</script>

<template>
  <Switch
    id="temp-toggle"
    v-model="prefersCelcius"
    :class="{ 'bg-blue-600': prefersCelcius, 'bg-gray-200': !prefersCelcius }"
    class="relative inline-flex h-[30px] w-[58px] items-center rounded-full border-2 border-indigo-50 bg-indigo-50 font-semibold text-gray-900 outline-2 outline-indigo-400 drop-shadow-md"
  >
    <span class="pointer-events-none absolute z-10 flex h-full w-full items-center">
      <span :class="!prefersCelcius ? 'text-white' : ''" class="flex-1 text-center">°F</span>
      <span :class="prefersCelcius ? 'text-white' : ''" class="flex-1 text-center">°C</span>
    </span>
    <span class="sr-only">Enable Celcius</span>
    <span
      :class="prefersCelcius ? 'translate-x-[26px]' : 'translate-x-0'"
      class="inline-block h-[28px] w-[28px] transform rounded-full bg-indigo-400 text-center transition"
    />
  </Switch>
</template>
