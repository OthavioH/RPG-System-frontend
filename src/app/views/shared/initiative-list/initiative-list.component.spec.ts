import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeListComponent } from './initiative-list.component';

describe('InitiativeListComponent', () => {
  let component: InitiativeListComponent;
  let fixture: ComponentFixture<InitiativeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiativeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
