import { TestBed } from '@angular/core/testing';

import { ThreatResolver } from './threat-resolver.resolver';

describe('ThreatResolverResolver', () => {
  let resolver: ThreatResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ThreatResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
