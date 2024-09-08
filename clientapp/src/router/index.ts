/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import budget from '@/pages/budget.vue'
import Transactions from '@/components/Financial/Transactions.vue'
import EditBudget from '@/components/Financial/EditBudget.vue'
import BudgetAccounts from '@/components/Financial/BudgetAccounts.vue'
import Exemptions from '@/components/Financial/Exemptions.vue'

const routes = [
  {
    path: '/budget/:budgetId',
    name: 'budget',
    component: budget,
    props: true,
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: EditBudget,
        props: true,
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: Transactions,
        props: true,
      },
      {
        path: 'accounts',
        name: 'accounts',
        component: BudgetAccounts,
        props: true,
      },
      {
        path: 'exemptions',
        name: 'exemptions',
        component: Exemptions,
        props: true,
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: (autoRoutes) => {
    const extendedRoutes = setupLayouts(autoRoutes);
    const routesRoutes = setupLayouts(routes);
    return [
      ...extendedRoutes,
      ...routesRoutes
    ];
  },
})

export default router
