import { Component, Prop, Watch } from 'vue-property-decorator'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface ModalProps {
  active: boolean
}

export interface ModalEventsWithOn {
  onClose: Event
}

@Component({
  name: 'Modal'
})
export default class Modal extends BaseComponent<
  ModalProps,
  ModalEventsWithOn
> {
  @Prop({ required: true }) active?: boolean

  @Watch('active')
  activeChange(value: boolean) {
    if (value) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }

  keyDownHandler(e: KeyboardEvent) {
    if (this.active && e.keyCode === 27) {
      this.$emit('close')
    }
  }

  created() {
    window.addEventListener('keydown', this.keyDownHandler)
  }

  destroyed() {
    window.removeEventListener('keydown', this.keyDownHandler)
  }

  render() {
    return (
      <div
        class={`${
          this.active ? '' : 'opacity-0 pointer-events-none'
        } modal fixed w-screen h-full top-0 left-0 flex items-center justify-center bg-white z-50 transition duration-200`}
      >
        <div class="modal-overlay fixed w-screen h-full bg-white _opacity-95" />

        <div class="modal-container fixed w-screen h-full z-50 overflow-y-auto">
          <div
            onClick={() => this.$emit('close')}
            class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-black text-sm z-50"
          >
            <fa-layers class="fa-3x text-gray-600">
              <fa icon={faTimes} />
            </fa-layers>
          </div>

          <div class="modal-content container mx-auto text-left p-4 m-10">
            {this.$slots.default}
          </div>
        </div>
      </div>
    )
  }
}
