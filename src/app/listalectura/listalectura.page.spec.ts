import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListalecturaPage } from './listalectura.page';

describe('ListalecturaPage', () => {
  let component: ListalecturaPage;
  let fixture: ComponentFixture<ListalecturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListalecturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListalecturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
