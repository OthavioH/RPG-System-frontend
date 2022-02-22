import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCharacterDialogComponent } from './delete-character-dialog.component';

describe('DeleteCharacterDialogComponent', () => {
  let component: DeleteCharacterDialogComponent;
  let fixture: ComponentFixture<DeleteCharacterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCharacterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCharacterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
