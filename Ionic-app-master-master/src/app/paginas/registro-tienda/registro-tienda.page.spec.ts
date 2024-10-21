import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroTiendaPage } from './registro-tienda.page';

describe('RegistroTiendaPage', () => {
  let component: RegistroTiendaPage;
  let fixture: ComponentFixture<RegistroTiendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
