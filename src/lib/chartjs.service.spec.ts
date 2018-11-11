import { TestBed } from '@angular/core/testing';

import { ChartjsService } from './chartjs.service';

describe('ChartjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartjsService = TestBed.get(ChartjsService);
    expect(service).toBeTruthy();
  });
});
