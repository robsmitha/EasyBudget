<template>
    <v-sheet color="grey-lighten-4">
        <v-container>
            <v-footer color="grey-lighten-4">
                <v-row>
                    <v-col>
                        <v-icon>mdi-piggy-bank-outline</v-icon>
                    </v-col>
                    <v-col v-if="store.sandbox" class="text-center">
                        <v-chip color="warning" variant="outlined" label density="compact">
                            Sandbox Mode
                        </v-chip>
                    </v-col>
                    <v-col>
                        <div class="text-right">
                            {{ new Date().getFullYear() }}
                        </div>
                    </v-col>
                </v-row>
            </v-footer>
        </v-container>
    </v-sheet>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app"
const store = useAppStore()
</script>