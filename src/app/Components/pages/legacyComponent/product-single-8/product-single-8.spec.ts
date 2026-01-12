import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle8 } from './product-single-8';

describe('ProductSingle8', () => {
  let component: ProductSingle8;
  let fixture: ComponentFixture<ProductSingle8>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle8]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle8);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
