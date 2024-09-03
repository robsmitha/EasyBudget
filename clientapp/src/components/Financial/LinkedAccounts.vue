<template>
    <v-row>
        <v-col>
            <span class="text-h5 font-weight-medium d-block">Accounts</span>
            <span class="text-caption text-grey-darken-1 d-block">
                Linked Institutions
            </span>
        </v-col>
        <v-col class="text-right">
            <v-btn variant="tonal" color="green-darken-4" @click="triggerPlaidLinkClick" :icon="$vuetify.display.mobile">
                <v-icon>mdi-plus</v-icon> <span v-if="!$vuetify.display.mobile">New</span>
            </v-btn>
        </v-col>
    </v-row>
    
    <!-- <v-alert
        color="warning"
        variant="outlined"
        class="mt-2 mb-4"
        prominent
        closable
        density="compact"
    >
       
        <span class="font-weight-bold d-block">
            <v-icon>mdi-test-tube</v-icon>
            Sandbox mode is enabled. All linked accounts are for testing purposes only.
        </span>
        <span class="text-caption d-block">NOTE: Sandbox credentials are "user_good" and "pass_good". Enter 1111 for 2FA code if prompted.</span>
    </v-alert> -->
    
    <AccountList :access-items="store.accessItems" />

    <span ref="plaidLinkContainer" class="d-none" id="plaidLinkContainer"></span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { PlaidLinkConnector } from './PlaidLinkConnector'
import accessItemService from "@/services/accessItem.service"
import { useBudgetStore } from "@/store/budget"

const store = useBudgetStore()

const plaidLinkContainer = ref<HTMLElement | null>(null)
const linkToken = ref<any>()

watch(() => linkToken.value, async (newLinkToken: string) => {
    if(newLinkToken){
        createPlaidLink(newLinkToken)
    }
})

onMounted(async () =>{
    store.fetchAccessItems()
    getLinkToken()
})

async function createPlaidLink(linkToken: string){
    const plaidLink = new PlaidLinkConnector(document.getElementById('plaidLinkContainer')!,
        'Link accounts', linkToken, exchangePublicToken)

    plaidLink.render()
}

function triggerPlaidLinkClick() {
  const button = plaidLinkContainer.value?.querySelector('button');
  button?.click();
}

async function getLinkToken(){
    const response = await accessItemService.createLinkToken()
    linkToken.value = response.data.link_token
}

async function exchangePublicToken(public_token: string) {
    await accessItemService.setAccessToken(public_token)
    store.fetchAccessItems()
}

</script>