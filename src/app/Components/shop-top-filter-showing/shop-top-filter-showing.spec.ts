import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTopFilterShowing } from './shop-top-filter-showing';

describe('ShopTopFilterShowing', () => {
  let component: ShopTopFilterShowing;
  let fixture: ComponentFixture<ShopTopFilterShowing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopTopFilterShowing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopTopFilterShowing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
