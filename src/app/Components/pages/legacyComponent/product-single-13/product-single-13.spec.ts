import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle13 } from './product-single-13';

describe('ProductSingle13', () => {
  let component: ProductSingle13;
  let fixture: ComponentFixture<ProductSingle13>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle13]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle13);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
