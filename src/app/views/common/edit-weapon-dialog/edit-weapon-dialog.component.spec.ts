import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeaponDialogComponent } from './edit-weapon-dialog.component';

describe('EditWeaponDialogComponent', () => {
  let component: EditWeaponDialogComponent;
  let fixture: ComponentFixture<EditWeaponDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWeaponDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeaponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
