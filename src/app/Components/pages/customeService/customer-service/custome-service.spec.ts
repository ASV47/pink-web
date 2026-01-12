import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeService } from './custome-service';

describe('CustomeService', () => {
  let component: CustomeService;
  let fixture: ComponentFixture<CustomeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
