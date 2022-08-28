import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatsDashboardComponent } from './threats-dashboard.component';

describe('ThreatsDashboardComponent', () => {
  let component: ThreatsDashboardComponent;
  let fixture: ComponentFixture<ThreatsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreatsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
