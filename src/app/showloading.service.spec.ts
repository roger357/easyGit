import { TestBed, inject } from '@angular/core/testing';

import { ShowloadingService } from './showloading.service';

describe('ShowloadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowloadingService]
    });
  });

  it('should be created', inject([ShowloadingService], (service: ShowloadingService) => {
    expect(service).toBeTruthy();
  }));
});
