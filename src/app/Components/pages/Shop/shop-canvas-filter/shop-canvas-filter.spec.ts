import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCanvasFilter } from './shop-canvas-filter';

describe('ShopCanvasFilter', () => {
  let component: ShopCanvasFilter;
  let fixture: ComponentFixture<ShopCanvasFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCanvasFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCanvasFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
