import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacortePage } from './listacorte.page';

describe('ListacortePage', () => {
  let component: ListacortePage;
  let fixture: ComponentFixture<ListacortePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacortePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
