import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoDeletarComponent } from './departamento-deletar.component';

describe('DepartamentoDeletarComponent', () => {
  let component: DepartamentoDeletarComponent;
  let fixture: ComponentFixture<DepartamentoDeletarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoDeletarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
