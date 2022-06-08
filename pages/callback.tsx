import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Callback'
})
export default class Callback extends Vue {
  render() {
    return (
      <div class="flex h-screen">
        <div class="m-auto">
          <div class="text-2xl">Logging in ...</div>
        </div>
      </div>
    )
  }
}
