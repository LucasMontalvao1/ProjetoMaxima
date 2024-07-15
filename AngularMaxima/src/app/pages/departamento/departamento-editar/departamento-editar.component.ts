import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/departamento.model';

@Component({
  selector: 'app-departamentos-editar',
  templateUrl: './departamento-editar.component.html',
  styleUrls: ['./departamento-editar.component.css']
})
export class DepartamentoEditarComponent implements OnInit {

  departamentoForm!: FormGroup;
  departamentoCodigo: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.departamentoForm = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }, Validators.required],
      descricao: ['', Validators.required]
    });

    this.departamentoCodigo = this.route.snapshot.params['codigo'];
    this.carregarDepartamentoParaEdicao();
  }

  carregarDepartamentoParaEdicao() {
    this.departamentoService.getDepartamentoByCodigo(this.departamentoCodigo).subscribe(
      (departamento: Departamento) => {
        if (departamento) {
          this.departamentoForm.patchValue({
            codigo: departamento.codigo,
            descricao: departamento.descricao
          });
        } else {
          console.error('Departamento não encontrado.');
          alert('Departamento não encontrado.');
          this.router.navigate(['/departamento']);
        }
      },
      (error) => {
        console.error('Erro ao carregar departamento para edição:', error);
        alert('Erro ao carregar departamento para edição. Verifique o console para mais detalhes.');
        this.router.navigate(['/departamento']);
      }
    );
  }

  onSubmit() {
    if (this.departamentoForm.valid) {
      const descricao = this.departamentoForm.get('descricao')?.value;

      const departamento: Departamento = {
        codigo: this.departamentoCodigo.toString(), 
        descricao
      };

      this.departamentoService.updateDepartamento(departamento.codigo, departamento).subscribe(
        (response) => {
          console.log('Departamento atualizado com sucesso:', response);
          alert('Departamento atualizado com sucesso.');
          this.router.navigate(['/departamento']);
        },
        (error) => {
          console.error('Erro ao atualizar departamento:', error);
          if (error.status === 400) {
            alert('Não foi possível atualizar o departamento. Verifique os dados e tente novamente.');
          } else {
            alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
          }
        }
      );
    } else {
      console.error('Formulário inválido. Verifique os campos.');
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
