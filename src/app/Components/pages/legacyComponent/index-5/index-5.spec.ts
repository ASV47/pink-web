import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Index5 } from './index-5';

describe('Index5', () => {
  let component: Index5;
  let fixture: ComponentFixture<Index5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Index5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Index5);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
