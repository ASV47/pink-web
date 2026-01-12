import { TestBed } from '@angular/core/testing';

import { PWA } from './pwa';

describe('PWA', () => {
  let service: PWA;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PWA);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
