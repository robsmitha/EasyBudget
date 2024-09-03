<template>
  <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
  <MyResume />
</template>

<script lang="ts" setup>

const breadcrumbs = [
    {
    title: 'HOME',
    disabled: false,
    to: '/',
  },
  {
    title: 'RESUME',
    disabled: true
  }
]
</script>
