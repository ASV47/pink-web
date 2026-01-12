import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle9 } from './product-single-9';

describe('ProductSingle9', () => {
  let component: ProductSingle9;
  let fixture: ComponentFixture<ProductSingle9>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle9]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle9);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
