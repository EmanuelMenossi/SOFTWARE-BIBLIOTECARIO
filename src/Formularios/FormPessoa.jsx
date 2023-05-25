import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import './estilos/FormProfessor.css';



export default function FormPessoa(props) {

  const [validado, setValidado] = useState(false);
  const [pessoa, setPessoa] = useState({
    categoria:"",
    cpf: "",
    nome: "",
    sexo: "",
    email: "",
    telefone: "",
    cidade: "",
    endereco: "",
    cep: "",
    dataNasc: ""
  });

  function manipularMudanca(e){
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setPessoa({...pessoa, [id]:valor})
  }

  function manipulaSubmissao (evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
        let pessoas = props.listaPessoas;
        pessoas.push(pessoa);
        props.setPessoas(pessoas);

        props.exibirTabela(true);
        setValidado(false);
     }
    else{
      setValidado(true)
    }
    evento.preventDefault();
    evento.stopPropagation();
    }
  

  
  return (
    
      <body id="corpo">
        <Container className="background mb-3">
          <h1 className='text-center colorWhite'>Cadastro de Pessoas</h1>
          <Form noValidate validated={validado} onSubmit={manipulaSubmissao} className='mainForm'>

          <Form.Group className="mb-3" controlId="CategoriaForm">
              <Form.Label>Categoria</Form.Label>
              <Form.Select value={pessoa.categoria} required id="categoria" onChange={manipularMudanca} aria-label="Default select example">
              <option value={setValidado}>Selecione uma das opções</option>
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
              <option value="Funcionário">Funcionário</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione a categoria da pessoa
            </Form.Control.Feedback>
            </Form.Group>



            <Form.Group className="mb-3" controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text" required placeholder="000.000.000-00" value={pessoa.cpf} id="cpf" onChange={manipularMudanca} />
              <Form.Control.Feedback type="invalid">
              Digite um cpf valido!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="NomeForm">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control type="text" required value={pessoa.nome} id="nome" onChange={manipularMudanca} placeholder="Digite o nome completo" />
              <Form.Control.Feedback type="invalid">
              Digite um nome valido!
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="SexoForm">
              <Form.Label>Gênero</Form.Label>
              <Form.Select value={pessoa.sexo} required id="sexo" onChange={manipularMudanca} aria-label="Default select example">
              <option value={setValidado}>Selecione uma das opções</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Indefinido">Indefinido</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Selecione seu Gênero
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="EmailForm">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" required value={pessoa.email} id="email" onChange={manipularMudanca} placeholder="@gmail.com" />
              <Form.Control.Feedback type="invalid">
              Digite um e-mail valido!
            </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="NumeroTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="text" required value={pessoa.telefone} id="telefone" onChange={manipularMudanca} placeholder="(00)00000-0000" />
              <Form.Control.Feedback type="invalid">
              Digite um telefone valido!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="MateriaForm">
              <Form.Label>Cidade</Form.Label>
              <Form.Control type="text" required value={pessoa.cidade} id="cidade" onChange={manipularMudanca} placeholder="Informe sua cidade" />
              <Form.Control.Feedback type="invalid">
              Digite uma cidade valida!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="MateriaForm">
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" required value={pessoa.endereco} id="endereco" onChange={manipularMudanca} placeholder="Informe seu endereco" />
              <Form.Control.Feedback type="invalid">
              Digite um endereço alido!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="CepForm">
              <Form.Label>CEP</Form.Label>
              <Form.Control type="text" required value={pessoa.cep} id="cep" onChange={manipularMudanca} placeholder="00000-000" />
              <Form.Control.Feedback type="invalid">
              Digite um CEP valido!
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataNascForm">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control required value={pessoa.dataNasc} id="dataNasc" onChange={manipularMudanca} type="date"/>
              <Form.Control.Feedback type="invalid">
              Digite uma data de nascimento valida!
            </Form.Control.Feedback>
            </Form.Group>


            
            <div className="botao" type="submit">
                <Button type="submit" variant="primary" id="cadastrar">Cadastrar</Button>{' '}
                <Button type="button" className="btn btn-secondary" onClick={()=>{props.exibirTabela(true)}}>Voltar</Button>{' '}
            </div>
          </Form>
        </Container>
      </body>
  );
}