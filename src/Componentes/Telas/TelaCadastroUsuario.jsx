import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../Layout/Pagina";
import FormCadastroUsuario from "../Formularios/formUsuario";
import TabelaUsuarios from "../Tabelas/tabelaUsuarios";

export default function TelaCadastroUsuario() {
    const [exibirUsuarios, setExibirUsuarios] = useState(true);

    return (
        <Pagina>
            <Alert className="mt-4 mb-02 success text-center" variant="light">
                <h2>
                    Cadastro de Usuário
                </h2>
            </Alert>
            {
                exibirUsuarios ?
                    <TabelaUsuarios
                        setExibirUsuarios={setExibirUsuarios}
                    />
                    :
                    <FormCadastroUsuario
                        setExibirUsuarios={setExibirUsuarios}
                    />
            }
        </Pagina>
    );
}