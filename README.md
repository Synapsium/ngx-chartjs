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




