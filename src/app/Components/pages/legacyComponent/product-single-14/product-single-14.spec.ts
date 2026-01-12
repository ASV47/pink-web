import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle14 } from './product-single-14';

describe('ProductSingle14', () => {
  let component: ProductSingle14;
  let fixture: ComponentFixture<ProductSingle14>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle14]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle14);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
