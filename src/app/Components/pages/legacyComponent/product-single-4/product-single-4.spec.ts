import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle4 } from './product-single-4';

describe('ProductSingle4', () => {
  let component: ProductSingle4;
  let fixture: ComponentFixture<ProductSingle4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle4);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
