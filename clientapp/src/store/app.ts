// Utilities
import { defineStore } from 'pinia'
import { WpPage, WpPost, WpTag, WpCategory } from './types'
import apiClient from '@/api/elysianClient'

type State = {
  pages: PageContent[],
  sandbox: boolean
}

type PageContent = {
  title: string,
  content: string,
  slug: string
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    pages: defaultState.pages,
    sandbox: defaultState.sandbox
  }),
  getters: {
    // pages
    aboutPage: (state: State) => state.pages.find((page) => page.slug === 'expense-tracker-how-it-works'),

  },
  actions: {
    async fetchContent(): Promise<void> {
      const response = await apiClient?.getData('/api/WordPressContent')
      this.pages = response.data.pages.map((p : WpPage) => {
        return {
          title: p.title.rendered,
          content: p.content.rendered,
          slug: p.slug
        }
      })
    }
  }
})


const defaultState: State = {
  pages: [
    {
      content: '\n<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>\n\n\n\n<p><strong>Step 1: Connect Your Bank</strong><br>Start by securely connecting your bank account using Plaid. Plaid is a trusted service that links your financial data with our app, ensuring your information is always protected.</p>\n\n\n\n<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>\n\n\n\n<p><strong>Step 2: Create Your Budget</strong><br>Next, set up your budget by defining the date range that works for you—whether it&#8217;s weekly, monthly, or any custom period. Then, create budget categories that reflect your spending habits, such as groceries, entertainment, or savings. Estimate how much you plan to spend in each category to stay on track.</p>\n\n\n\n<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>\n\n\n\n<p><strong>Step 3: Categorize Your Transactions</strong><br>As transactions come in, you&#8217;ll have the opportunity to categorize them under your budget categories. If there are transactions that don’t fit or you don’t want to include in your budget, you can easily exclude them. This step helps you track where your money is going and ensures you stay within your budget.</p>\n',
      title: 'How it Works',
      slug: 'expense-tracker-how-it-works'
    }
  ],
  sandbox: true
}