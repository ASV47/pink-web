import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle2 } from './product-single-2';

describe('ProductSingle2', () => {
  let component: ProductSingle2;
  let fixture: ComponentFixture<ProductSingle2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
