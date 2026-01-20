import { TestBed } from '@angular/core/testing';

import { CategoryTree } from './category-tree';

describe('CategoryTree', () => {
  let service: CategoryTree;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryTree);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
