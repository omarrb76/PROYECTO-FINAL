import { TestBed } from '@angular/core/testing';

import { MiApiService } from './mi-api.service';

describe('MiApiService', () => {
  let service: MiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
