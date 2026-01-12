import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle23 } from './product-single-23';

describe('ProductSingle23', () => {
  let component: ProductSingle23;
  let fixture: ComponentFixture<ProductSingle23>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle23]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle23);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
