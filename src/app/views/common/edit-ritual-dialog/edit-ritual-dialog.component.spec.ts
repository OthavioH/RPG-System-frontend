import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRitualDialogComponent } from './edit-ritual-dialog.component';

describe('EditRitualDialogComponent', () => {
  let component: EditRitualDialogComponent;
  let fixture: ComponentFixture<EditRitualDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRitualDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRitualDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
