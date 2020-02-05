import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CortePage } from './corte.page';

describe('CortePage', () => {
  let component: CortePage;
  let fixture: ComponentFixture<CortePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CortePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
