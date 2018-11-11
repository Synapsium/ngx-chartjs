import { Component, Inject, Optional, ViewChild, ElementRef, Input, Output, OnInit, AfterViewInit, OnChanges, OnDestroy, SimpleChanges, NgZone } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartLegendOptions, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ChartjsConfig, CHARTJS_CONFIG, DEFAULT_OPTIONS_CONFIG } from './chartjs.config';

@Component({
  selector: 'ngx-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() className: string;
  @Input() type: ChartType | string = 'doughnut';
  @Input() data: ChartData | any;
  @Input() options: ChartOptions;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  private _instance: Chart;

  constructor(private zone: NgZone, @Optional() @Inject(CHARTJS_CONFIG) private CHARTJS_CONFIG: ChartjsConfig) { }

  ngOnInit() {
    if (typeof Chart === 'undefined') {
      throw new TypeError('Chartjs wrapper requires chart.js (https://www.chartjs.org)');
    }
  }

  ngAfterViewInit() {
    if (!this._instance) {
      this._init();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && !changes.options.isFirstChange()) {
      this._updateOptions();
    }

    if (changes.data && !changes.data.isFirstChange()) {
      this._updateData();
    }
  }

  ngOnDestroy() {
    if (this._instance) {
      this._instance.destroy();
    }
  }

  private _init() {
    if (this._instance) {
      this._instance.destroy();
    }

    const configuration: ChartConfiguration = { type: this.type, data: this.data };
    this._initOptions(configuration.options);

    this.zone.runOutsideAngular(() => {
      this._instance = new Chart(this.canvas.nativeElement, configuration);
    });
  }

  private _initOptions(options: ChartOptions) {
    Object.assign(options, DEFAULT_OPTIONS_CONFIG);

    if(this.CHARTJS_CONFIG){
      Object.assign(options, this.CHARTJS_CONFIG);
    }

    Object.assign(options, this.options);
  }

  private _updateData() {
    if (!this._instance) {
      this._init();
      return;
    }

    this._instance.data.labels = this.data.labels;
    this._updateDatasets();
    this._instance.update();
  }

  private _updateDatasets(){
    const currentChartDatasets:Array<ChartDataSets> = this._instance.data && this._instance.data.datasets || new Array<ChartDataSets>();
    const newChartDatasets:Array<ChartDataSets> = this.data && this.data.datasets || new Array<ChartDataSets>();
    const removedChartDatasets:Array<ChartDataSets> = currentChartDatasets.length === 0 ? new Array<ChartDataSets>() : 
                                                                                          currentChartDatasets.filter(currentDataset => !newChartDatasets.find(newDataset => newDataset.label === currentDataset.label && 
                                                                                                                                                                             newDataset.type === currentDataset.type));
    const addedChartDatasets:Array<ChartDataSets> = newChartDatasets.length === 0 ? new Array<ChartDataSets>() : 
                                                                                    newChartDatasets.filter(newDataset => !currentChartDatasets.find(currentDataset => newDataset.label === currentDataset.label &&
                                                                                                                                                                       newDataset.type === currentDataset.type));

    // Remove chart datasets
    removedChartDatasets.forEach(removedChartDataset => {
      const index = currentChartDatasets.indexOf(removedChartDataset);
      currentChartDatasets.splice(index, 1);
    });

    // Update chart datasets
    currentChartDatasets.forEach(currentChartDataset => {
      const newChartDataset = newChartDatasets.find(chartDataset => chartDataset.label === currentChartDataset.label);
      Object.assign(currentChartDataset, newChartDataset);
    });

    // Add chart datasets
    currentChartDatasets.push(...addedChartDatasets);
  }

  private _updateOptions() {
    if (!this._instance) {
      this._init();
      return;
    }

    this._instance['options'] = Chart.helpers['configMerge'](this._instance['options'], this.options);
    this._instance.update();
  }
}
