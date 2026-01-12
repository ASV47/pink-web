import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLoadMore } from './shop-load-more';

describe('ShopLoadMore', () => {
  let component: ShopLoadMore;
  let fixture: ComponentFixture<ShopLoadMore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopLoadMore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopLoadMore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
