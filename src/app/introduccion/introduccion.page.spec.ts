import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduccionPage } from './introduccion.page';

describe('IntroduccionPage', () => {
  let component: IntroduccionPage;
  let fixture: ComponentFixture<IntroduccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroduccionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
