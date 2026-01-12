import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUs1 } from './about-us-1';

describe('AboutUs1', () => {
  let component: AboutUs1;
  let fixture: ComponentFixture<AboutUs1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUs1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUs1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
