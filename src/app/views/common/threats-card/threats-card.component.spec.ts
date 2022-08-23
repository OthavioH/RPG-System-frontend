import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatsCardComponent } from './threats-card.component';

describe('ThreatsCardComponent', () => {
  let component: ThreatsCardComponent;
  let fixture: ComponentFixture<ThreatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreatsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
