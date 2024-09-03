<template>
    <v-app-bar 
      :color="!drawer && transparency ? 'transparent' : '#1F8A4D'" 
      :class="{
        'text-white': !drawer && transparency
      }" 
      flat
      fixed
    >
      <template #prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="text-h6 text-uppercase font-weight-medium">
        Easy Budget
      </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        temporary
    >
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-roof" title="Home" value="home" to="/"></v-list-item>
        <v-list-item v-if="auth.signedIn" prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" to="/dashboard"></v-list-item>
        <v-list-item v-if="auth.signedIn" prepend-icon="mdi-bank" title="Accounts" value="accounts" to="/accounts"></v-list-item>
        <v-list-item :subtitle="auth.signedIn ? auth.userDetails : 'Get Started'"></v-list-item>
        <v-list-item v-if="!auth.signedIn" prepend-icon="mdi-login" title="Sign in" href="/.auth/login/aad"></v-list-item>
        <v-list-item v-if="auth.signedIn" prepend-icon="mdi-logout" title="Sign out" href="/.auth/logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useAppStore } from "@/store/app"
import { useAuthStore } from "@/store/auth"
import { useRoute } from 'vue-router'
const route = useRoute()

const store = useAppStore()
store.fetchContent()

const auth = useAuthStore()
auth.fetchAuth()

const drawer = ref(false)
const transparency = ref(false)

watch(route, (newVal) => {
    transparency.value = newVal.path === '/'
}, { immediate: true })

onMounted(() =>{
  window.addEventListener('scroll', () => {
    transparency.value = route.path === '/' && window.scrollY <= 75
  })
})
</script>
