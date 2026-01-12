import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle20 } from './product-single-20';

describe('ProductSingle20', () => {
  let component: ProductSingle20;
  let fixture: ComponentFixture<ProductSingle20>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle20]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle20);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
