import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrers } from './carrers';

describe('Carrers', () => {
  let component: Carrers;
  let fixture: ComponentFixture<Carrers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carrers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
