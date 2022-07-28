import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollAttributeDialogComponent } from './roll-attribute-dialog.component';

describe('RollAttributeDialogComponent', () => {
  let component: RollAttributeDialogComponent;
  let fixture: ComponentFixture<RollAttributeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollAttributeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollAttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
