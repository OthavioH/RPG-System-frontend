import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRitualDialogComponent } from './show-ritual-dialog.component';

describe('ShowRitualDialogComponent', () => {
  let component: ShowRitualDialogComponent;
  let fixture: ComponentFixture<ShowRitualDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRitualDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRitualDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
