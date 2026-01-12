import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle5 } from './product-single-5';

describe('ProductSingle5', () => {
  let component: ProductSingle5;
  let fixture: ComponentFixture<ProductSingle5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle5);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
