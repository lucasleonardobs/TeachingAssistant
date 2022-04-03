import { Aluno } from './aluno';

export class AlunoService {
  alunos: Aluno[] = [];

  gravar(aluno: Aluno): boolean {
    if (!this.alunos.find(a => a.cpf == aluno.cpf)) {
      this.alunos.push(aluno);
      return true
    }
    return false
  }
}
