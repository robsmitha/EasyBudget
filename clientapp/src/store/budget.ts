// Utilities
import { defineStore } from 'pinia'

import accessItemService from "@/services/accessItem.service"
import budgetService from "@/services/budget.service"
import categoryService from "@/services/category.service"

type State = {
  categories: any | undefined,
  accessItems: any | undefined,
  budget: any | undefined,
  loadingBudget: Boolean
}

export const useBudgetStore = defineStore('budget', {
  state: (): State => ({
    categories: undefined,
    accessItems: undefined,
    budget: undefined,
    loadingBudget: false
  }),
  getters: {
    
  },
  actions: {
    async fetchCategories(): Promise<void> {
      const response = await categoryService.getCategories()
      this.categories = response.data
    },
    async fetchAccessItems(): Promise<void> {
      const response = await accessItemService.getUserAccessItems()
      this.accessItems = response.data
    },
    async fetchBudget(budgetId: number){
        this.loadingBudget = true
        const response = await budgetService.getBudget(budgetId)
        this.budget = response.data
        this.loadingBudget = false
    }
  }
})