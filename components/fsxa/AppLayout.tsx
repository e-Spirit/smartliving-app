import { FSXABaseAppLayout, FSXAGetters } from 'fsxa-pattern-library'
import { NavigationData, ComparisonQueryOperatorEnum, Dataset } from 'fsxa-api'
import Component from 'vue-class-component'
import { styles, defaultStyles } from '@/services/tailwindStyleMapper'

// @ts-ignore
@Component({
  name: 'AppLayout',
  head() {
    return {
      style: [
        {
          type: 'text/css',
          innerHTML: defaultStyles()
        },
        {
          type: 'text/css',
          innerHTML: styles((this as any).globalSettings?.data || {})
        }
      ]
    }
  },
  middleware: 'auth'
})
export default class AppLayout extends FSXABaseAppLayout {
  messageAlertVisible = false

  mounted() {
    if (!this.translations) {
      this.fetchTranslation()
    }
  }

  showNewMessageAlert() {
    this.messageAlertVisible = true
  }

  get navigationData(): NavigationData | null {
    return this.$store.getters[FSXAGetters.navigationData]
  }

  async fetchTranslation() {
    const res = await this.fsxaApi.fetchByFilter({
      filters: [
        {
          field: 'entityType',
          operator: ComparisonQueryOperatorEnum.EQUALS,
          value: 'translations'
        },
        {
          field: 'schema',
          operator: ComparisonQueryOperatorEnum.EQUALS,
          value: 'global'
        }
      ],
      locale: this.locale,
      pagesize: 99
    })
    this.setStoredItem(this.storedKey, res)
  }

  get storedKey() {
    return 'translations'
  }

  get translations() {
    return this.getStoredItem<Dataset[]>(this.storedKey)
  }

  render() {
    return ['initializing', 'not_initialized'].includes(this.appState) ? (
      <div />
    ) : (
      <div class="min-h-screen">{this.$slots.default}</div>
    )
  }
}
