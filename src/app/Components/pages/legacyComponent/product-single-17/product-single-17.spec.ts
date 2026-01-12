import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle17 } from './product-single-17';

describe('ProductSingle17', () => {
  let component: ProductSingle17;
  let fixture: ComponentFixture<ProductSingle17>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle17]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle17);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
