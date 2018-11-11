import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartjsModule, ChartjsConfig, CHARTJS_CONFIG } from '../../../src';

const DEFAULT_CHARTJS_CONFIG: ChartjsConfig = {
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartjsModule
  ],
  providers: [
    {
      provide: CHARTJS_CONFIG,
      useValue: DEFAULT_CHARTJS_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
