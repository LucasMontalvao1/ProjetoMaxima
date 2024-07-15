import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoDetalharComponent } from './produto-detalhar.component';

describe('ProdutoDetalharComponent', () => {
  let component: ProdutoDetalharComponent;
  let fixture: ComponentFixture<ProdutoDetalharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoDetalharComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoDetalharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
