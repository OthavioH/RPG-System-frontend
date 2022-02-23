import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWeaponDialogComponent } from './create-weapon-dialog.component';

describe('CreateWeaponDialogComponent', () => {
  let component: CreateWeaponDialogComponent;
  let fixture: ComponentFixture<CreateWeaponDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWeaponDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWeaponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
