<script setup lang="ts">
import FilterInput from "./components/FilterInput.vue";
</script>

<template>
  <div>
    <div>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
      <FilterInput></FilterInput>
    </div>
    <div class="m-4 flex justify-between">
      <div>
        <button class="btn">Add filter</button>
      </div>
      <div class="space-x-4">
        <button class="btn btn-outline">Reset</button>
        <button class="btn btn-outline btn-accent">Search</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
