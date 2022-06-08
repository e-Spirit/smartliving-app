import Component from 'vue-class-component'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'
import { getFallbackTranslation } from '~/services/i18n'

@Component({
  name: 'LangSelector'
})
export default class LangSelector extends BaseComponent {
  langKeyMapper: { [key: string]: string } = {
    de_DE: 'language.de',
    en_GB: 'language.en'
  }

  async onLangChange(event: any) {
    const locale = event.target?.value === 'language.de' ? 'de_DE' : 'en_GB'

    this.$store.commit('setPermittedNavigation', {
      data: await this.fsxaApi.fetchNavigation({ locale }),
      config: this.$config
    })

    return this.triggerRouteChange({
      pageId: this.currentPage?.id,
      locale
    })
  }

  render() {
    return (
      <div>
        <select
          class="block w-full py-2 px-3 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
          name="field-name"
          onChange={this.onLangChange}
          value={this.langKeyMapper[this.locale]}
        >
          <option value="language.en">
            {this.globalSettings?.data.label_language_english ||
              getFallbackTranslation([this.locale, 'language', 'en_GB'])}
          </option>
          <option value="language.de">
            {this.globalSettings?.data.label_language_german ||
              getFallbackTranslation([this.locale, 'language', 'de_DE'])}
          </option>
        </select>
      </div>
    )
  }
}
