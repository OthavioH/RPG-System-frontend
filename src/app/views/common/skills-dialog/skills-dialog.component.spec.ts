import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsDialogComponent } from './skills-dialog.component';

describe('SkillsDialogComponent', () => {
  let component: SkillsDialogComponent;
  let fixture: ComponentFixture<SkillsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
