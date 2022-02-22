import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenChooseSkillsDialogComponent } from './open-choose-skills-dialog.component';

describe('OpenChooseSkillsDialogComponent', () => {
  let component: OpenChooseSkillsDialogComponent;
  let fixture: ComponentFixture<OpenChooseSkillsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenChooseSkillsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenChooseSkillsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
