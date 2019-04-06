import { TestBed } from '@angular/core/testing';

import { ListVerbsService } from './list-verbs.service';

describe('ListVerbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListVerbsService = TestBed.get(ListVerbsService);
    expect(service).toBeTruthy();
  });
});
