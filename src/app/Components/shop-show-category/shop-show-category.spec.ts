import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopShowCategory } from './shop-show-category';

describe('ShopShowCategory', () => {
  let component: ShopShowCategory;
  let fixture: ComponentFixture<ShopShowCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopShowCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopShowCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
