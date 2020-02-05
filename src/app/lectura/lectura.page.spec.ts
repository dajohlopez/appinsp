import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaPage } from './lectura.page';

describe('LecturaPage', () => {
  let component: LecturaPage;
  let fixture: ComponentFixture<LecturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
