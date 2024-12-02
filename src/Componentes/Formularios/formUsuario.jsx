import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { gravarUsuario, zerarMensagem } from "../../Redux/redux.usuario";
import ESTADO from "../../Redux/redux.estado";

export default function FormCadastroUsuario(props) {
    let { estado, mensagem } = useSelector((state) => state.usuarios);
    const [formValidado, setFormValidado] = useState(false);

    const [zeraUsuario] = useState({
        nickname: "",
        urlAvatar: "",
        senha: ""
    });


    const [usuario, setUsuario] = useState(zeraUsuario);
    const despachante = useDispatch();
    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
            setUsuario(zeraUsuario);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
        }
    }, [estado, mensagem, props, zeraUsuario, despachante]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);            
            despachante(gravarUsuario(usuario));
            // window.alert("Usuario " + usuario.nickname +" inserido!");
            setUsuario(zeraUsuario);
            props.setExibirUsuarios(true);
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        <Container className="w-50">
            <Form className="mb-4" noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome de Usuário</Form.Label>
                    <Form.Control
                        required
                        id="nickname"
                        name="nickname"
                        value={usuario.nickname}
                        onChange={manipularMudanca}
                        type="text"
                        placeholder="Nome de Usuário"
                    />
                    <Form.Control.Feedback type="invalid">
                        Informe o nickname!
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Url da Imagem</Form.Label>
                    <Form.Control
                        required
                        id="urlAvatar"
                        name="urlAvatar"
                        value={usuario.urlAvatar}
                        onChange={manipularMudanca}
                        type="url"
                        placeholder="URL do avatar"
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a Url do seu avatar.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca}
                        type="password"
                        placeholder="Senha"
                    />
                    <Form.Control.Feedback type="invalid">
                        Senha necessária!
                    </Form.Control.Feedback>
                </Form.Group>


                <Row className="mt-2 mb-2">
                    <Col md={2}>
                        <Button type="submit" variant="success">Criar</Button>
                    </Col>
                    <Col>
                        <Button type="button" variant="success"
                            onClick={() => {
                                setUsuario(zeraUsuario);
                                props.setExibirUsuarios(true);
                            }}
                        >
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
