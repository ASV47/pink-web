import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferAFriend } from './refer-afriend';

describe('ReferAFriend', () => {
  let component: ReferAFriend;
  let fixture: ComponentFixture<ReferAFriend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferAFriend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferAFriend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
