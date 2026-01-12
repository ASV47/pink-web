import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCustomBunner } from './shop-custom-bunner';

describe('ShopCustomBunner', () => {
  let component: ShopCustomBunner;
  let fixture: ComponentFixture<ShopCustomBunner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCustomBunner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCustomBunner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
