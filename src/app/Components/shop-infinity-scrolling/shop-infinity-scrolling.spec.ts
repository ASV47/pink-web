import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfinityScrolling } from './shop-infinity-scrolling';

describe('ShopInfinityScrolling', () => {
  let component: ShopInfinityScrolling;
  let fixture: ComponentFixture<ShopInfinityScrolling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopInfinityScrolling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopInfinityScrolling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
