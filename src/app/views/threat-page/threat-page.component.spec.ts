import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatPageComponent } from './threat-page.component';

describe('ThreatPageComponent', () => {
  let component: ThreatPageComponent;
  let fixture: ComponentFixture<ThreatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreatPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
