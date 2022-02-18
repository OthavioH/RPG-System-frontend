import { TestBed } from '@angular/core/testing';

import { CaracthersService } from './personagens.service';

describe('PersonagensService', () => {
  let service: CaracthersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracthersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
