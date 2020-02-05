import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaPage } from './entrega.page';

describe('EntregaPage', () => {
  let component: EntregaPage;
  let fixture: ComponentFixture<EntregaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
