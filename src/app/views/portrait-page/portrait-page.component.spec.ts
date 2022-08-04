import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitPageComponent } from './portrait-page.component';

describe('PortraitPageComponent', () => {
  let component: PortraitPageComponent;
  let fixture: ComponentFixture<PortraitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortraitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortraitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
