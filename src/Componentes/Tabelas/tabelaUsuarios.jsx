import { Button, Image, Table } from "react-bootstrap";
import { useEffect } from "react";
import { consultarUsuarios, deletarUsuario } from "../../Redux/redux.usuario";
import { useDispatch, useSelector } from "react-redux";

export default function TabelaUsuarios(props) {
    let { listaUsuarios } = useSelector((state) => state.usuarios);
    const despachante = useDispatch();

    useEffect(() => {
        despachante(consultarUsuarios());
    }, [despachante])

    const excluirUsuario = (usuario) => {
        let senha = prompt("Senha do usuário: ");
        let user = { ...usuario, senha: senha };
        despachante(deletarUsuario(user));
    }

    return (
        <>
            <Button variant="primary" onClick={() => { props.setExibirUsuarios(false) }}>
                Adicionar
            </Button>
            <p className="mt-4"> Usuarios Cadastrados: {listaUsuarios?.length || 0}</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nickname</th>
                        <th>Avatar</th>
                        <th>Data Ingresso</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios?.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nickname}</td>
                                <td>
                                    <Image
                                        style={{ width: "100px" }}
                                        src={item.urlAvatar}
                                        thumbnail
                                        alt="avatar"
                                    /></td>
                                <td>{item.dataIngresso}</td>
                                <Button
                                    onClick={() => excluirUsuario(item)}
                                    variant="danger"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-trash"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                </Button>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}