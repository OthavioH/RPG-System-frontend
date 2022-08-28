import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThreatDialogComponent } from './create-threat-dialog.component';

describe('CreateThreatDialogComponent', () => {
  let component: CreateThreatDialogComponent;
  let fixture: ComponentFixture<CreateThreatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateThreatDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateThreatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
