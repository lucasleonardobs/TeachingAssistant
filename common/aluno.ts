export class Aluno {
    nome: string;
    cpf: string;
    email: string;
    github_login: string;
    metas: any;

    constructor() {
        this.clean();
    }

    clean(): void {
        this.nome = "";
        this.cpf = "";
        this.email = "";
        this.github_login = "";
        this.metas = {};
    }

    clone(): Aluno {
        var aluno: Aluno = new Aluno();
        aluno.copyFrom(this);
        return aluno;
    }

    copyFrom(from: Aluno): void {
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.email = from.email;
        this.github_login = from.github_login;
        this.copyMetasFrom(from.metas);
    }

    copyMetasFrom(from: any): void {
        this.metas = {};

        for (const key in from) {
            this.metas[key] = from[key];
        }
    }
}