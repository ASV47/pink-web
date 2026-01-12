import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle22 } from './product-single-22';

describe('ProductSingle22', () => {
  let component: ProductSingle22;
  let fixture: ComponentFixture<ProductSingle22>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle22]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle22);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
