import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle7 } from './product-single-7';

describe('ProductSingle7', () => {
  let component: ProductSingle7;
  let fixture: ComponentFixture<ProductSingle7>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle7]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle7);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
