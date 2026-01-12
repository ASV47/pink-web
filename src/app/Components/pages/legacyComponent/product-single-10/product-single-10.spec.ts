import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingle10 } from './product-single-10';

describe('ProductSingle10', () => {
  let component: ProductSingle10;
  let fixture: ComponentFixture<ProductSingle10>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingle10]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingle10);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
