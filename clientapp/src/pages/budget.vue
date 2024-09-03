<template>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
      >
        <template v-slot:prepend>
          <v-list-item
                lines="two"
                title="Budget"
                :class="{ 'pl-2': rail }"
                to="edit"
            >
                <template v-slot:prepend>
                    <v-avatar color="green-darken-4" class="ml-2">
                        <v-icon color="white" :size="rail ? 'xsmall': 'large'">mdi-currency-usd</v-icon>
                    </v-avatar>
                </template>
                <template v-slot:subtitle>
                    <v-skeleton-loader v-if="store.loadingBudget" class="bg-transparent" type="text"></v-skeleton-loader>
                    <span v-else>{{ store.budget?.budgetName }}</span>
                </template>
            </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-chart-pie" title="Categories" value="edit" to="edit"></v-list-item>
            <v-list-item prepend-icon="mdi-credit-card-outline" title="Transactions" value="transactions" to="transactions"></v-list-item>
            <v-list-item prepend-icon="mdi-bank" title="Accounts" value="accounts" to="accounts"></v-list-item>
        </v-list>
        
        <template v-slot:append>
          <v-list-item
                :class="{ 'pl-2': rail }"
            >
                <template v-slot:append>
                    <v-btn
                        :icon="rail ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'"
                        variant="text"
                        size="small"
                        class="ml-0"
                        @click="rail = !rail"
                    ></v-btn>
                </template>
            </v-list-item>
        </template>
    </v-navigation-drawer>

    
    <v-sheet color="grey-lighten-4" class="h-100">
        <v-container fluid>
          <!-- <v-alert
            color="warning"
            variant="outlined"
            class="mb-2"
            prominent
            closable
            density="compact"
          >
            <v-icon>mdi-information</v-icon>
            Plaid sandbox mode is enabled. All linked accounts are for testing purposes only. 
          </v-alert> -->
          <router-view />
        </v-container>
    </v-sheet>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import budgetService from "@/services/budget.service"
import { useDisplay } from 'vuetify'
import { useBudgetStore } from "@/store/budget"

const props = defineProps({
  budgetId: { type: String }
})

const store = useBudgetStore()
const { mobile } = useDisplay()

const breadcrumbs = computed(() => [
  {
    title: 'HOME',
    disabled: false,
    to: '/',
  },
  {
    title: 'DASHBOARD',
    disabled: false,
    to: '/dashboard',
  },
  {
    title: store.budget?.budgetName?.toUpperCase() ?? 'BUDGET',
    disabled: true
  }
])

const drawer = ref(true)
const rail = ref(true)

const isMobile = computed(() => mobile.value);

onMounted(async () => {
    rail.value = isMobile.value
    store.fetchBudget(Number(props.budgetId))
})


</script>