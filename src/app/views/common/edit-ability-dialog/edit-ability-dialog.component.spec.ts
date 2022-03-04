import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbilityDialogComponent } from './edit-ability-dialog.component';

describe('EditAbilityDialogComponent', () => {
  let component: EditAbilityDialogComponent;
  let fixture: ComponentFixture<EditAbilityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbilityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
