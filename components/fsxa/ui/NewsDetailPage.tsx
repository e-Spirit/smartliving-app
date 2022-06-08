import { Component, Prop } from 'vue-property-decorator'
import { FSXABaseComponent, FSXARichText } from 'fsxa-pattern-library'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { UiNews } from '~/types'

interface Props {
  news: UiNews
}

@Component({
  name: 'NewsDetailPage'
})
export default class NewsDetailPage extends FSXABaseComponent<Props> {
  @Prop({ required: true }) news!: UiNews

  showVideo = false

  renderYoutubeVideo(youtubeId: string) {
    if (!youtubeId) {
      return ''
    }
    return (
      <div class="aspect-w-16 aspect-h-9 my-3">
        {this.showVideo ? (
          <iframe
            class="m-auto"
            width="590px"
            height="332x"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            frameborder="0"
            allowfullscreen
            // @ts-ignore
            allow="autoplay;"
          />
        ) : (
          <div
            class="cursor-pointer flex flex-auto justify-center relative"
            onClick={() => (this.showVideo = true)}
          >
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
              alt="Youtube Thumbnail"
              width="590px"
              height="332x"
            />
            <fa-layers class="fa-6x text-gray-800 absolute inset-0 z-10 m-auto opacity-85">
              <fa icon={faYoutube} />
            </fa-layers>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <section class="relative pb-20 overflow-x-hidden">
        <div class="container mx-auto px-4">
          <div class="relative h-96 -mx-6 mb-20">
            <div class="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-80 w-full bg-primary" />
            <img
              class="relative w-full h-96 px-6 object-cover"
              // src={this.news.image.resolutions?.w1472xh384?.url}
              src={this.news.image.resolutions?.w612xh321?.url}
              alt=""
            />
          </div>
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-6xl md:text-7xl font-bold font-heading text-gray-800">
              {this.news.title}
            </h2>
            <div class="inline-flex pt-14 mb-14 items-center">
              <img
                class="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                src="/author_dummy.jpg"
                alt=""
              />
              <div class="text-left">
                <h4 class="mb-1 text-2xl font-bold font-heading text-gray-600">
                  {/* this.news.author[0]?.data?.name */}
                </h4>
                <p class="text-gray-600">
                  {new Date(this.news.date).toDateString()}
                </p>
              </div>
            </div>
            <div class="text-left">
              <div>
                {this.news.video.value.map((video) =>
                  this.renderYoutubeVideo(video?.value?.id)
                )}
              </div>
              <div class="text-xl text-gray-600">
                <FSXARichText content={this.news.text} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
