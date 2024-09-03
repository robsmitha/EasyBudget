<template>

    <v-row>
        <v-col>
            <!-- <span class="text-h4 font-weight-medium d-block">Transactions</span> -->
            <span class="text-caption text-grey-darken-1 d-block">
                {{ store.budget?.dateRange }}
            </span>
        </v-col>
    </v-row>

    <v-tabs
      v-model="tab"
      color="green-darken-4"
    >
      <v-tab :value="`transactions`">Transactions</v-tab>
      <v-tab :value="`excluded`">Excluded Transactions</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
        <v-tabs-window-item
            :value="`transactions`"
        >
            <v-row class="my-2">
                <v-col cols="9" md="11" class="pr-1">
                    <v-autocomplete
                        v-model="selectedCategoryId"
                        :items="store.categories"
                        :disabled="!selectedTransactions || selectedTransactions.length === 0 || loading"
                        :loading="loading"
                        clearable
                        chips
                        label="Categories"
                        item-value="financialCategoryId"
                        item-title="name"
                        variant="outlined"
                        hide-details
                        density="compact"
                    >
                    </v-autocomplete>
                </v-col>
                <v-col cols="3" md="1" class="pl-1">
                    <v-btn color="green-darken-4" variant="tonal" class="h-100" block :disabled="!selectedCategoryId" :loading="loading" @click="saveCategories">
                        <v-icon>mdi-content-save</v-icon> Save
                    </v-btn>
                </v-col>
            </v-row>
            <v-card>
                <v-card-text>
                    <v-data-table
                        v-model="selectedTransactions"
                        :headers="headers"
                        :items="store.budget?.transactions"
                        :loading="loading"
                        item-value="transactionId"
                        items-per-page="5"
                        return-object
                        show-select
                    >
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn size="small" color="grey-darken-2" icon variant="text" @click="excludeTransactions(item)">
                                <v-icon>mdi-delete-outline</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            
        </v-tabs-window-item>
        <v-tabs-window-item
            :value="`excluded`"
        >
            
            <v-row class="mt-2">
                <v-col>
                    <v-data-table
                        :headers="excludedHeaders"
                        :items="store.budget?.excludedTransactions"
                        :loading="loading"
                        item-value="transactionId"
                        items-per-page="5"
                    >
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn size="small" color="grey-darken-2" icon variant="text" @click="restoreTransactions(item)">
                                <v-icon>mdi-delete-off-outline</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-tabs-window-item>
    </v-tabs-window>

</template>

<script lang="ts" setup>

import { ref, watch, computed, onMounted } from 'vue'
import { useBudgetStore } from "@/store/budget"
import budgetService from "@/services/budget.service"

const props = defineProps({
  budgetId: { type: String }
})

const store = useBudgetStore()
const headers = [
    { title: 'Date', key: 'date' },
    { title: 'Transaction', key: 'name' },
    { title: 'Amount', key: 'amount' },
    { title: 'Category', key: 'category.name' },
    { title: 'Account', key: 'account.official_name' },
    { title: '', sortable: false, key: 'actions' }
]
const selectedTransactions = ref<any>(null)
const selectedCategoryId = ref<any>(null)
const loading = ref(false)
const tab = ref('transactions')

onMounted(async () => {
    store.fetchCategories()
})

const excludedHeaders = [
    { title: 'Date', key: 'date' },
    { title: 'Transaction', key: 'name' },
    { title: 'Amount', key: 'amount' },
    { title: 'Account', key: 'account.official_name' },
    { title: '', sortable: false, key: 'actions' }
]

async function saveCategories(e: Event) {
    e.stopPropagation()
    if(selectedCategoryId.value && selectedTransactions.value.length > 0){
        await setTransactionsCategory()
    }
}

async function setTransactionsCategory(){
    const data = selectedTransactions.value?.map((t: any) => {
        return {
            transactionId: t.transaction_id,
            financialCategoryId: selectedCategoryId.value,
            budgetId: Number(props.budgetId)
        }
    })
    
    loading.value = true
    const response = await budgetService.bulkUpdateTransactionCategory(data);
    if(response){
        store.fetchBudget(Number(props.budgetId))
    }
    selectedCategoryId.value = null
    selectedTransactions.value = null
    loading.value = false
}

async function excludeTransactions(t:any) {
    loading.value = true
    await budgetService.setExcludedTransaction({
        transactionId: t.transaction_id,
        budgetId: Number(props.budgetId)
    })
    store.fetchBudget(Number(props.budgetId))
    loading.value = false
}

async function restoreTransactions(t:any) {
    loading.value = true
    await budgetService.setRestoredTransaction({
        transactionId: t.transaction_id,
        budgetId: Number(props.budgetId)
    })
    store.fetchBudget(Number(props.budgetId))
    loading.value = false
}
</script>