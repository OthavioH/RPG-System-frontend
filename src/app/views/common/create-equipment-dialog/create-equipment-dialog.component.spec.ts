import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEquipmentDialogComponent } from './create-equipment-dialog.component';

describe('CreateEquipmentDialogComponent', () => {
  let component: CreateEquipmentDialogComponent;
  let fixture: ComponentFixture<CreateEquipmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEquipmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEquipmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
