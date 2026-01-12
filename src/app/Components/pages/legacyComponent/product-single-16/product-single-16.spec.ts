import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle16 } from './product-single-16';

describe('ProductSingle16', () => {
  let component: ProductSingle16;
  let fixture: ComponentFixture<ProductSingle16>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle16]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle16);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
