import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUs2 } from './about-us-2';

describe('AboutUs2', () => {
  let component: AboutUs2;
  let fixture: ComponentFixture<AboutUs2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUs2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUs2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
