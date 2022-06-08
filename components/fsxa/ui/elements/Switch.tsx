import { Component, Prop } from 'vue-property-decorator'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface SwitchProps {
  activeState: boolean
  title: string
}

export interface SwitchEventsWithOn {
  onClick: Event
}

@Component({
  name: 'Login'
})
export default class Switch extends BaseComponent<
  SwitchProps,
  SwitchEventsWithOn
> {
  @Prop({ required: true }) activeState?: boolean
  @Prop({ required: true }) title?: string

  render() {
    return (
      <div class="flex items-center ">
        <button
          onClick={(e) => this.$emit('click', e)}
          type="button"
          class={`${
            this.activeState ? 'bg-primary' : 'bg-gray-200'
          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          role="switch"
          aria-checked="false"
          aria-labelledby="annual-billing-label"
        >
          <span
            aria-hidden="true"
            class={`${
              this.activeState ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </button>
        <span class="ml-3 pr-8" id="annual-billing-label">
          <span class="text-lg font-medium text-gray-900">{this.title}</span>
        </span>
      </div>
    )
  }
}
