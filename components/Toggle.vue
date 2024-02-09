<script setup lang="ts">
import { Switch } from '@headlessui/vue';

const isCelcius = defineModel({ default: false, type: Boolean });
</script>

<template>
  <Switch
    v-model="isCelcius"
    :class="isCelcius ? 'bg-blue-600' : 'bg-gray-200'"
    class="relative inline-flex h-[30px] w-[58px] items-center rounded-full border-2 border-indigo-50 bg-indigo-50 font-semibold text-gray-900 outline-2 outline-indigo-400 drop-shadow-md"
  >
    <span class="pointer-events-none absolute z-10 flex h-full w-full items-center">
      <span :class="!isCelcius ? 'text-white' : ''" class="flex-1 text-center transition">°F</span>
      <span :class="isCelcius ? 'text-white' : ''" class="flex-1 text-center transition">°C</span>
    </span>
    <span class="sr-only">Enable Celcius</span>
    <span
      :class="isCelcius ? 'translate-x-[26px]' : 'translate-x-0'"
      class="inline-block h-[28px] w-[28px] transform rounded-full bg-indigo-400 text-center transition"
    />
  </Switch>
</template>
