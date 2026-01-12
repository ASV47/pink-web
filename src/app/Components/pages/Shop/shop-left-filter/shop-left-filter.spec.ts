import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLeftFilter } from './shop-left-filter';

describe('ShopLeftFilter', () => {
  let component: ShopLeftFilter;
  let fixture: ComponentFixture<ShopLeftFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopLeftFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopLeftFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
