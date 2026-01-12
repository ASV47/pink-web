import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopShowCategory2 } from './shop-show-category-2';

describe('ShopShowCategory2', () => {
  let component: ShopShowCategory2;
  let fixture: ComponentFixture<ShopShowCategory2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopShowCategory2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopShowCategory2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
