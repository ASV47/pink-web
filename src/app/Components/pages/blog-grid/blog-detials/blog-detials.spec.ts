import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetials } from './blog-detials';

describe('BlogDetials', () => {
  let component: BlogDetials;
  let fixture: ComponentFixture<BlogDetials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
