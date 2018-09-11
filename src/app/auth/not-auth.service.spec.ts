import { TestBed, inject } from '@angular/core/testing';

import { NotAuthService } from './not-auth.service';

describe('NotAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotAuthService]
    });
  });

  it('should be created', inject([NotAuthService], (service: NotAuthService) => {
    expect(service).toBeTruthy();
  }));
});
