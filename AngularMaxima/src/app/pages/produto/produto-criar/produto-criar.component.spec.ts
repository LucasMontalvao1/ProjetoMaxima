import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCriarComponent } from './produto-criar.component';

describe('ProdutoCriarComponent', () => {
  let component: ProdutoCriarComponent;
  let fixture: ComponentFixture<ProdutoCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
