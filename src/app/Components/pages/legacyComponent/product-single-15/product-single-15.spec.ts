import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle15 } from './product-single-15';

describe('ProductSingle15', () => {
  let component: ProductSingle15;
  let fixture: ComponentFixture<ProductSingle15>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle15]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle15);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
