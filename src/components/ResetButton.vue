<script setup>
const emit = defineEmits(['reset'])
</script>

<template>
  <button type="button" class="reset-button" @click="emit('reset')">Reset</button>
</template>
