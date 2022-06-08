import { Component, Prop } from 'vue-property-decorator'
import { FSXABaseComponent, FSXARichText } from 'fsxa-pattern-library'
import { UiNews } from '~/types'
import Modal from '~/components/fsxa/ui/elements/Modal'
import NewsDetailPage from '~/components/fsxa/ui/NewsDetailPage'
import { SOURCE_ID_SECONDARY } from '~/dataSources/News'

interface Props {
  payload: UiNews & { display_mode: 'page' | 'overlay' }
  route: string
}

@Component({
  name: 'NewsCard'
})
export default class NewsCard extends FSXABaseComponent<Props> {
  @Prop({ required: true }) payload!: Props['payload']
  @Prop({ required: true }) route!: Props['route']

  showModal = false

  onClick() {
    if (this.payload.display_mode === 'page') {
      if (this.payload.sourceId === SOURCE_ID_SECONDARY) {
        const detailNavItem = this.$store.getters.navItem(
          // @ts-ignore
          this.globalSettings.data.ps_coporate_detail_page.referenceId
        )
        return this.$router.push(
          `${detailNavItem.seoRoute}?id=${this.payload.id}`
        )
      }

      return this.triggerRouteChange({ route: this.route })
    }
    this.showModal = true
  }

  render() {
    return (
      <div>
        <div>
          <div
            class="flex flex-wrap mb-16 bg-gray-700 rounded-lg overflow-hidden cursor-pointer"
            onClick={this.onClick}
          >
            <div class="w-full md:w-1/2 relative">
              <img
                class="w-full h-full object-cover object-top"
                src={this.payload.image.resolutions?.square?.url}
                alt=""
              />
              <div class="absolute bottom-0 left-0 ml-8 mb-6 px-3 pb-3 pt-1 inline-block bg-white rounded-b-2xl border-t-4 border-primary">
                <p class="text-xl text-center font-bold">
                  {new Date(this.payload.date).getDate()}
                </p>
                <p class="text-xs uppercase text-gray-500 ">
                  {new Date(this.payload.date)
                    .toLocaleString('default', {
                      month: 'long'
                    })
                    .substring(0, 3)}
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/2 pt-16 px-8 xl:px-14 lg:px-4 pb-14">
              <div class="pb-8 border-b border-gray-400">
                <h3 class="xl:text-3xl text-2xl">
                  <a class="inline-block text-white font-bold" href="#">
                    {this.payload.title} 
                  </a>
                </h3>
                <p class="text-base text-gray-200">
                  <FSXARichText content={this.payload.teaser || ''} />
                </p>
              </div>
              <div class="flex items-center mt-8">
                <span class="text-lg text-gray-200">
                  {this.payload.tagging
                    .map((item) => item.data.name)
                    .join(' // ')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Modal active={this.showModal} onClose={() => (this.showModal = false)}>
          {this.showModal ? <NewsDetailPage news={this.payload} /> : ''}
        </Modal>
      </div>
    )
  }
}
