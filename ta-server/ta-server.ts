import express = require('express');
import bodyParser = require("body-parser");

import { Aluno } from '../common/aluno';
import { CadastroDeAlunos } from './cadastrodealunos';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', (req: express.Request, res: express.Response) => {
  var aluno: Aluno = <Aluno>req.body; //verificar se � mesmo Aluno!
  const aluno_was_created: Aluno | null = cadastro.cadastrar(aluno);
  if (aluno_was_created) {
    res.send({ "success": "O aluno foi cadastrado com sucesso" });
  } else {
    res.send({ "failure": "O aluno n�o pode ser cadastrado" });
  }
})

taserver.put('/aluno', (req: express.Request, res: express.Response) => {
  var aluno: Aluno | undefined = <Aluno>req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({ "success": "O aluno foi atualizado com sucesso" });
  } else {
    res.send({ "failure": "O aluno n�o pode ser atualizado" });
  }
})

taserver.delete('/aluno/:cpf', (req: express.Request, res: express.Response) => {
  const cpf = req.params.cpf
  try {
    let result = cadastro.deletar(cpf)
    res.send({ "success": "O aluno foi deletado da base de dados", })
  } catch (err) {
    res.send({ "failure": "Um erro impediu que o aluno fosse deletado", "error": err })
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})