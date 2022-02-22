import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDiceDialogComponent } from './roll-dice-dialog.component';

describe('RollDiceDialogComponent', () => {
  let component: RollDiceDialogComponent;
  let fixture: ComponentFixture<RollDiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollDiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollDiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
