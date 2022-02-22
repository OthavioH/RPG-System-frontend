import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenChooseAttributesDialogComponent } from './open-choose-attributes-dialog.component';

describe('OpenChooseAttributesDialogComponent', () => {
  let component: OpenChooseAttributesDialogComponent;
  let fixture: ComponentFixture<OpenChooseAttributesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenChooseAttributesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenChooseAttributesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
