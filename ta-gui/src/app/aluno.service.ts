import { Aluno } from './aluno';

export class AlunoService {
  alunos: Aluno[] = [];

  gravar(aluno: Aluno): boolean {
    if (this.cpfNaoCadastrado(aluno.cpf)) {
      this.alunos.push(aluno);
      return true
    }
    return false
  }
  cpfNaoCadastrado(cpf: string): boolean {
    return !this.alunos.find(a => a.cpf == cpf);
  }
}
