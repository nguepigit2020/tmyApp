import { TestBed } from '@angular/core/testing';

import { TmyconfService } from './tmyconf.service';

describe('TmyconfService', () => {
  let service: TmyconfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmyconfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
