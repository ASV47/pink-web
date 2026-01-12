import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle6 } from './product-single-6';

describe('ProductSingle6', () => {
  let component: ProductSingle6;
  let fixture: ComponentFixture<ProductSingle6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle6);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
