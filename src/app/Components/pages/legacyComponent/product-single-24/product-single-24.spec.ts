import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle24 } from './product-single-24';

describe('ProductSingle24', () => {
  let component: ProductSingle24;
  let fixture: ComponentFixture<ProductSingle24>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle24]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle24);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
