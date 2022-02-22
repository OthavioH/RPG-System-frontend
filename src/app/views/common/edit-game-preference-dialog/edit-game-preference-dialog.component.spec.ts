import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGamePreferenceDialogComponent } from './edit-game-preference-dialog.component';

describe('EditGamePreferenceDialogComponent', () => {
  let component: EditGamePreferenceDialogComponent;
  let fixture: ComponentFixture<EditGamePreferenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGamePreferenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGamePreferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
