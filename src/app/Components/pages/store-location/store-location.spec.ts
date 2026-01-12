import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocation } from './store-location';

describe('StoreLocation', () => {
  let component: StoreLocation;
  let fixture: ComponentFixture<StoreLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreLocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
