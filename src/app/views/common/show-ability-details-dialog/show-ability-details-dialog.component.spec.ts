import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAbilityDetailsDialogComponent } from './show-ability-details-dialog.component';

describe('ShowAbilityDetailsDialogComponent', () => {
  let component: ShowAbilityDetailsDialogComponent;
  let fixture: ComponentFixture<ShowAbilityDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAbilityDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAbilityDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
