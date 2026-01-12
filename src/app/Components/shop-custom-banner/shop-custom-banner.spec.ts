import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCustomBanner } from './shop-custom-banner';

describe('ShopCustomBanner', () => {
  let component: ShopCustomBanner;
  let fixture: ComponentFixture<ShopCustomBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCustomBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCustomBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
