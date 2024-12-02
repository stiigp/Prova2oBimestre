import { Alert } from "react-bootstrap";

export default function Cabecalho(props) {
  
  
  //método render
  return (
    <Alert className={"text-center"} variant="light">{props.titulo || "ihihi ha"}</Alert>
  );
}