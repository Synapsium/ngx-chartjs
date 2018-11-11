import { InjectionToken } from '@angular/core';
import { ChartOptions } from 'chart.js';

export const CHARTJS_CONFIG = new InjectionToken<ChartjsConfig>('CHARTJS_CONFIG');

export const DEFAULT_OPTIONS_CONFIG: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
};

export interface ChartjsConfig {
    options: ChartOptions;
}
