import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle21 } from './product-single-21';

describe('ProductSingle21', () => {
  let component: ProductSingle21;
  let fixture: ComponentFixture<ProductSingle21>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle21]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle21);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
