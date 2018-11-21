<a href="http://synapsium.com">
    <h1 align="center">ngx-chartjs</h1>
</a>

<p align="center">
Quickly way to integrate <a href="https://www.chartjs.org">Chart.js</a> components with <a href="https://angular.io/">Angular</a>
</p>

# chart.js

One of the most popular and powerful open source library to create a  data visualization. To use this library you should get familiar with the <a href="https://www.chartjs.org">Chart.js</a> documentation.

## Setup

### Installation

Install `ngx-chartjs` library from `npm`

```bash
npm install @synapsium/ngx-chartjs --save
```
### Module usage

Add `ChartjsModule` to module

```javascript
import { ChartjsModule, ChartjsConfig, CHARTJS_CONFIG } from '@synapsium/ngx-chartjs';

const DEFAULT_CHARTJS_CONFIG: ChartjsConfig = {
    options {
        responsive: true,
        maintainAspectRatio: false
    }
};

@NgModule({
  ...
  imports: [
    ...
    SwiperModule
  ],
  providers: [
    {
      provide: CHARTJS_CONFIG,
      useValue: DEFAULT_CHARTJS_CONFIG
    }
  ]
})
```

Check out the <a href="https://www.chartjs.org/docs/latest/">API Doc</a> for the available options.


## How to use

In your target component integrate chartjs element :
```html
<chartjs [className]="chart" 
         [type]="type" 
         [data]="data" 
         [options]="options">
</chartjs>
```
### Inputs

| Input             | Type                           | Default           | Description                                                       |
| ----------------- | ------------------------------ | ----------------- | -----------------------------------------------------------------------------------------------------------------------------------------    |
| className         | `string`                       |                   | Custom css class name applied on parent container of chart canvas |
| type              | `string`                       | `'doughnut'`      | Type of chart : `'doughnut'`, `'line'`, `'bar'`, `'radar'`, `'pie'`, `'polarArea'`, `'bubble'`, `'scatter'` |
| data           | `ChartData`                         | `'{}'`             | <a href="https://www.chartjs.org/docs/latest/getting-started/usage.html">Data of chart</a>                                                                                                              |
| options   | `ChartOptions`                         | `{ responsive: true, maintainAspectRatio: false}`              | <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chart.js/index.d.ts">Options of chart</a>                                                                                            |

> `Options` properties of global config will be replaced by local `Options`.



