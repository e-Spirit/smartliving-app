import { Component, Prop } from 'vue-property-decorator'
import { ApexOptions } from 'apexcharts'
import { UiChartItem, UiCharts } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface UiElementProps {
  payload: UiCharts
}

@Component({
  name: 'Charts'
})
export default class Charts extends BaseComponent<UiElementProps> {
  @Prop({ required: true }) payload!: UiElementProps['payload']

  chartOptions(chart: UiChartItem): ApexOptions {
    return {
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: '60%'
          },
          dataLabels: {
            name: {
              offsetY: 30,
              show: true,
              color: '#888',
              fontSize: '13px'
            },
            value: {
              offsetY: -10,
              color: '#111',
              fontSize: '26px',
              fontWeight: 600,
              show: true,
              formatter(): string {
                return chart.data.st_value
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        colors: [chart.data.st_color],
        gradient: {
          shade: 'light',
          type: 'vertical',
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [chart.data.st_label]
    }
  }

  chartsList: UiChartItem[] = []

  mounted() {
    this.$nextTick(() => {
      this.chartsList = this.payload.st_chart_list
    })
  }

  chartJSX(chart: UiChartItem) {
    return (
      <div class="w-full px-4 mb-8 lg:mb-0">
        <div class="p-6 bg-white rounded" data-re={chart.data.st_headline}>
          <h3 class="text-xl font-bold border-b">{chart.data.st_headline}</h3>
          {/* @ts-ignore */}
          <ApexChart
            type="radialBar"
            options={this.chartOptions(chart)}
            series={[chart.data.st_progress]}
            height="300px"
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <section class="pb-8">
        <div class="container px-4 mx-auto">
          <div class="flex flex-wrap -mx-4">
            {/* @ts-ignore */}
            {this.chartsList.map((item) => {
              return this.chartJSX(item)
            })}
          </div>
        </div>
      </section>
    )
  }
}
