import React, { useEffect, useState } from 'react';
import { Form, Button, ListGroup, Image } from 'react-bootstrap';
import Pagina from "../Layout/Pagina"
import { useDispatch, useSelector } from 'react-redux';
import ESTADO from '../../Redux/redux.estado';
import { consultarUsuarios } from '../../Redux/redux.usuario';
import { consultarChats, deletarChat, gravarChat, zerarMensagem } from '../../Redux/redux.batepapo';
import { parse, differenceInMinutes } from 'date-fns';

export default function TelaBatePapo() {
    let { listaUsuarios } = useSelector((state) => state.usuarios);
    let { estado, mensagem, listaChats } = useSelector((state) => state.chats);
    const despachante = useDispatch();
    const [formValidado, setFormValidado] = useState(false);

    const [zeraMsg] = useState({
        usuario: {},
        mensagem: ""
    });
    const [msg, setMsg] = useState(zeraMsg);

    useEffect(() => {
        despachante(consultarUsuarios());
        despachante(consultarChats());
    }, [despachante])

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            window.alert(mensagem);
            despachante(consultarChats());
            despachante(zerarMensagem());
            setMsg(zeraMsg);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
        }
    }, [estado, mensagem, zeraMsg, despachante]);

    function deletar(chat) {
        despachante(deletarChat(chat));
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            despachante(gravarChat(msg));
        }
        else
            setFormValidado(true);
        evento.preventDefault();
        evento.stopPropagation();
    }

    async function verificaSenha(user) {
        let senha = prompt("Insira a senha para autenticar o user: ");
        const res = await fetch("https://backend-bcc-2-b.vercel.app/usuario/verificarSenha", {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            },
            body:{
                "nickname": user.nickname,
                "senha": senha
            }
        })

        
        if (res.json()["senhaCorreta"] === true) {
            return true;
        } else {
            return false
        }
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        if (elemento === "usuario" && valor !== "") {

            const novo = JSON.parse(valor);
            setMsg({ ...msg, [elemento]: novo });
        }
        else {
            setMsg({ ...msg, [elemento]: valor });
        }
    }

    return (
        <Pagina>
            <Form className="mt-4" noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Select
                        required
                        id="usuario"
                        name="usuario"
                        value={JSON.stringify(msg.usuario)}
                        onChange={manipularMudanca}
                    >
                        <option value="">Escolha o Usuario</option>
                        {listaUsuarios?.map((usuario) => (
                            <option key={usuario.id} value={JSON.stringify(usuario)}>
                                {usuario.nickname}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o usuario!
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mt-3">
                    <Form.Label>Mensagem:</Form.Label>
                    <Form.Control
                        required
                        id="mensagem"
                        name="mensagem"
                        as="textarea"
                        rows={3}
                        value={msg.mensagem}
                        onChange={manipularMudanca}
                        placeholder="Digite sua Mensagem"
                    />
                </Form.Group>

                <Button variant="success" onClick={manipularSubmissao} className="mt-2">
                    Enviar
                </Button>
            </Form>


            <div className="mt-5">
                <ListGroup>
                    {listaChats?.map((item) => (
                        <ListGroup.Item key={item.id} className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <Image
                                    style={{ width: "100px" }}
                                    src={item.usuario.urlAvatar}
                                    thumbnail
                                    alt="avatar"
                                    className="me-3"
                                />
                                <strong>{item.usuario.nickname}</strong>: {item.mensagem} <br />
                                <small>postado em: {item.dataHora}</small>
                            </div>
                            {
                                <Button onClick={() => { deletar(item) }} variant="danger" type="button" className="ms-auto">
                                    Excluir
                                </Button>
                            }
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Pagina>
    );
}
