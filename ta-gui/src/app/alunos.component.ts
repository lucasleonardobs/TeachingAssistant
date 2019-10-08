import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  aluno: Aluno = new Aluno();
  alunos: Aluno[] = [];
  cpfduplicado: boolean = false;
  deletado: boolean = false;

  constructor(private alunoService: AlunoService) { }

  criarAluno(a: Aluno): void {
    this.alunoService.criar(a)
      .subscribe(
        ar => {
          if (ar) {
            this.alunos.push(ar);
            this.aluno = new Aluno();
          } else {
            this.cpfduplicado = true;
          }
        },
        msg => { alert(msg.message); }
      );
  }

  deletarLocal(cpf: string): void {
    this.alunos = this.alunos.filter(aluno => aluno.cpf !== cpf)
  }

  deletarAluno(cpf: string): void {
    this.alunoService.deletar(cpf)
      .subscribe(
        _ => {
          this.alunoService.getAlunos()
            .subscribe(
              as => { this.alunos = as; },
              msg => { alert(msg.message); }
            );
        },
        msg => { alert(msg.message); }
      )
  }

  onMove(): void {
    this.cpfduplicado = false;
  }

  ngOnInit(): void {
    this.alunoService.getAlunos()
      .subscribe(
        as => { this.alunos = as; },
        msg => { alert(msg.message); }
      );
  }

}