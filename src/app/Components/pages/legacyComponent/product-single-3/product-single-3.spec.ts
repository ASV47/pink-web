import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle3 } from './product-single-3';

describe('ProductSingle3', () => {
  let component: ProductSingle3;
  let fixture: ComponentFixture<ProductSingle3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
