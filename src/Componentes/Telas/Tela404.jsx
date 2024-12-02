import Pagina from '../Layout/Pagina'
import imagem404 from '../Imagens/404.png'

export default function Tela404() {
    return (
        <Pagina>
            <img src={imagem404} alt="Erro 404" />
        </Pagina>
    );
}