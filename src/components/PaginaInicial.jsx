import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";
import {useNavigate} from "react-router-dom";

export default function PaginaInicial() {
    const { setSelectedService } = useContext(UserContext);
    const navigate = useNavigate();

    function handleServiceSelection(event) {
        console.log("Button clicked:", event.target.name);
        const serviceName = event.target.name;
        setSelectedService(serviceName);
        navigate(`/${serviceName}`);
    }

    return (
        <main className={"mainCommon"}>
            <h2>Qual tipo de serviço você está procurando?</h2>
            <div className={"box-buttons"}>
                <button name="acessorios" onClick={handleServiceSelection}>Acessórios para casa ou uso pessoal</button>
                <button name="comidas" onClick={handleServiceSelection}>Comidas/doces</button>
                <button name="estetica" onClick={handleServiceSelection}>Estética</button>
                <button name="manicure" onClick={handleServiceSelection}>Manicure</button>
                <button name="terapias" onClick={handleServiceSelection}>Terapias</button>
            </div>
        </main>
    )
}