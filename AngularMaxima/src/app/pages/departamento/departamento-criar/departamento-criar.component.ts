import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-departamentos-criar',
  templateUrl: './departamento-criar.component.html',
  styleUrls: ['./departamento-criar.component.css']
})
export class DepartamentoCriarComponent implements OnInit {

  departamentoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.departamentoForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.departamentoForm.valid) {
      const { codigo, descricao } = this.departamentoForm.value;

      const departamento = {
        codigo,
        descricao
      };

      console.log('Dados do departamento a serem enviados:', departamento);

      this.departamentoService.createDepartamento(departamento).subscribe(
        (response) => {
          console.log('Departamento criado com sucesso:', response);
          alert('Departamento criado com sucesso.');
          this.router.navigate(['/departamento']);
        },
        (error) => {
          console.error('Erro ao criar departamento:', error);
          if (error.status === 400) {
            alert('Não foi possível criar o departamento. Verifique os dados e tente novamente.');
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
