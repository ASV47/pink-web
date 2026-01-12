import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle19 } from './product-single-19';

describe('ProductSingle19', () => {
  let component: ProductSingle19;
  let fixture: ComponentFixture<ProductSingle19>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle19]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle19);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
