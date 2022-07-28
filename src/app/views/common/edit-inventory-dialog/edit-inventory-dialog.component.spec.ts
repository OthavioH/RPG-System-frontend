import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInventoryDialogComponent } from './edit-inventory-dialog.component';

describe('EditInventoryDialogComponent', () => {
  let component: EditInventoryDialogComponent;
  let fixture: ComponentFixture<EditInventoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInventoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInventoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
