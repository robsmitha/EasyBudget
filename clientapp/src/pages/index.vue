<template>
  <HelloWorld text="Simple. Fast. Easy." :actions="actions" />
  <AboutMe />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
const auth = useAuthStore()

const actions = computed(() => auth.signedIn 
? [
  { icon: 'mdi-shimmer', text: 'Try it out', to: '/dashboard'}
]
: [
  { icon: 'mdi-login', text: 'Sign in', href: '/.auth/login/aad'}
])
</script>
