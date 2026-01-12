import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle12 } from './product-single-12';

describe('ProductSingle12', () => {
  let component: ProductSingle12;
  let fixture: ComponentFixture<ProductSingle12>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle12]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle12);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
