import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTopFilter } from './shop-top-filter';

describe('ShopTopFilter', () => {
  let component: ShopTopFilter;
  let fixture: ComponentFixture<ShopTopFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopTopFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopTopFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
