import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonagemFormComponent } from './personagem-form.component';

describe('CriarPersonagemComponent', () => {
  let component: PersonagemFormComponent;
  let fixture: ComponentFixture<PersonagemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonagemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonagemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
