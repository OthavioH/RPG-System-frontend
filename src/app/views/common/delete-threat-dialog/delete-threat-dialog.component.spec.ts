import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteThreatDialogComponent } from './delete-threat-dialog.component';

describe('DeleteThreatDialogComponent', () => {
  let component: DeleteThreatDialogComponent;
  let fixture: ComponentFixture<DeleteThreatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteThreatDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteThreatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
