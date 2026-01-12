import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle18 } from './product-single-18';

describe('ProductSingle18', () => {
  let component: ProductSingle18;
  let fixture: ComponentFixture<ProductSingle18>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle18]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle18);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
