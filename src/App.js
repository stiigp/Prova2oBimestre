import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaHome from "./Componentes/Telas/TelaInicio"
import TelaBatePapo from "./Componentes/Telas/TelaCadastroMensagem"
import TelaCadastroUsuario from "./Componentes/Telas/TelaCadastroUsuario";
import Tela404 from "./Componentes/Telas/Tela404";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/Prova2oBimestre" element={<TelaHome />} />
                    <Route path="/Prova2oBimestre/usuario" element={<TelaCadastroUsuario />} />
                    <Route path="/Prova2oBimestre/chat" element={<TelaBatePapo />} />
                    <Route path="*" element={<Tela404 />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
