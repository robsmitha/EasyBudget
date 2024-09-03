<template>
    <v-row>
        <v-col>
            <span class="text-caption text-grey-darken-1 d-block">
                {{ store.budget?.dateRange }}
            </span>
            <span class="text-h5 d-block">Accounts</span>
            <span class="text-caption text-grey-darken-1 font-weight-thin d-block">
                Linked Institutions
            </span>
        </v-col>
    </v-row>
    
    <AccountList :access-items="store.budget?.budgetAccessItems" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBudgetStore } from "@/store/budget"

const store = useBudgetStore()

onMounted(async () =>{
    store.fetchAccessItems()
})


</script>