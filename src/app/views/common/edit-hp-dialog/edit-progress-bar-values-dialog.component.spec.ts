import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgressBarValuesDialogComponent } from './edit-progress-bar-values-dialog.component';

describe('EditHpDialogComponent', () => {
  let component: EditProgressBarValuesDialogComponent;
  let fixture: ComponentFixture<EditProgressBarValuesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProgressBarValuesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgressBarValuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
