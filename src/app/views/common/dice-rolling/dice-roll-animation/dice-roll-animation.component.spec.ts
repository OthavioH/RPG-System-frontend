import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollAnimationComponent } from './dice-roll-animation.component';

describe('DiceRollAnimationComponent', () => {
  let component: DiceRollAnimationComponent;
  let fixture: ComponentFixture<DiceRollAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiceRollAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceRollAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
