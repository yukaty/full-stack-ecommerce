import { TestBed } from '@angular/core/testing';

import { MapleStoreFormService } from './maplestore-form.service';

describe('MaplestoreFormService', () => {
  let service: MapleStoreFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapleStoreFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
