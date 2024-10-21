import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroAuthPage } from './registro-auth.page';

describe('RegistroAuthPage', () => {
  let component: RegistroAuthPage;
  let fixture: ComponentFixture<RegistroAuthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
