import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaentregaPage } from './listaentrega.page';

describe('ListaentregaPage', () => {
  let component: ListaentregaPage;
  let fixture: ComponentFixture<ListaentregaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaentregaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaentregaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
