import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoEditarComponent } from './departamento-editar.component';

describe('DepartamentoEditarComponent', () => {
  let component: DepartamentoEditarComponent;
  let fixture: ComponentFixture<DepartamentoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
