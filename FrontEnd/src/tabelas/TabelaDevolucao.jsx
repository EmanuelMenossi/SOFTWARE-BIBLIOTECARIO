import { Button, Table, Form, Container, Row, Col } from "react-bootstrap";
import "./estilos/tabela.css";
import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRef } from "react";
import { utils, writeFileXLSX } from "xlsx";
import { TfiHelpAlt } from "react-icons/tfi";
import Image from 'react-bootstrap/Image';
const Swal = require('sweetalert2')
export default function TabelaDevolucao(props) {
    const [termoDeBusca, setTermoDeBusca] = useState('');
    const [exemplar, setExemplar] = useState([]);
    const [acervoLista, setAcervoLista] = useState([]);

    const tbl = useRef(null)

    function imprimir() {
        const wb = utils.table_to_book(tbl.current);
        writeFileXLSX(wb, "baixaexemplar.xlsx");
    }

    return (
        <body id="corpo" className="colorwhite">
            <Container className="border mb-2 mt-2 corpoTabela" >
                <h2 className="text-center m-4">Devoluções Cadastradas</h2>
                <TfiHelpAlt onClick={() => {
            Swal.fire({
              title: "Precisa de ajuda?",
              html: `<hr><p>Para efetuar um cadastro, clicar no botão verde. <span><Image src="/cadastrar.png" alt="Descrição da imagem" fluid/></span></p>
              <p><Image src="/exemplo.png" alt="Descrição da imagem"/></p>
              <p>Preencha todos os campos e clique no botão <Strong>"Cadastrar"</Strong> novamente.</p>
              <hr>
              <p>Para excluir um determinado item, clique no ícone da lixeira em vermelho. <br><span><Image src="/delete.png" alt="Descrição da imagem"/></span></p>
              <hr>
              <p>Para gerar um relatório em Excel, clique no botão em azul". <br><span><Image src="/exportar.png" alt="Descrição da imagem"/></span></p>
              `,
              icon: "question"
            });
          }} />
                <Row className='mb-2 mt-2 '>
                    <Col>
                        <Button variant="success"
                            onClick={() => {
                                props.exibirTabela(false);
                                props.setModoEdicao(false);
                            }}>
                            Cadastrar
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-end md-2 mb-2">
                        <Button variant="primary" onClick={imprimir}>Exportar para Excel</Button>
                    </Col>
                </Row>

                <Table ref={tbl} striped bordered hover className="text-center">
                    <thead className="colorwhite">
                        <tr>
                            <th>Código</th>
                            <th>Data de Devolução</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Categoria</th>
                            <th>Título</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listaDevolucoes?.map((devolucao, indice) => {

                            const dataDevolucao = new Date(devolucao.dataDevolucao);
                            const dia = String(dataDevolucao.getDate()).padStart(2, '0');
                            const mes = String(dataDevolucao.getMonth() + 1).padStart(2, '0');
                            const ano = dataDevolucao.getFullYear();
                            const dataFormatada = `${dia}/${mes}/${ano}`;

                            const cpf = devolucao.pessoa.cpf;
                            const cpfLimpo = cpf.replace(/\D/g, '');
                            const cpfFormatado = cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

                            return (
                                <tr key={indice}>
                                    <td id="colorwhite">{devolucao.codigo}</td>
                                    <td id="colorwhite">{dataFormatada}</td>
                                    <td id="colorwhite">{devolucao.pessoa.nome}</td>
                                    <td id="colorwhite">{cpfFormatado}</td>
                                    <td id="colorwhite">{devolucao.pessoa.categoria}</td>
                                    <td id="colorwhite">
                                        {devolucao.listaExemplares.map((exemplar, index) => {
                                            if (exemplar && exemplar.exemplar && exemplar.exemplar.acervo) {
                                                const titulo = exemplar.exemplar.acervo.titulo;
                                                return <div key={index}>{titulo}</div>;
                                            } else {
                                                return <div key={index}>Título não definido</div>;
                                            }
                                        })}
                                    </td>
                                    <td>
                                        <Button variant="danger"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: "Tem certeza?",
                                                    text: "Você não poderá reverter isso",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText: "Sim, exclui isso!"
                                                  }).then((result) => {
                                                    if (result.isConfirmed) {
                                                      Swal.fire({
                                                        title: "Deletado!",
                                                        text: "Devolução deletada com sucesso. ",
                                                        icon: "success"
                                                      });
                                                      props.excluirDevolucao(devolucao);
                                                    }
                                                  });
                                            }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </body>
    );
}
