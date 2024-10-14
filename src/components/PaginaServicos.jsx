import {useContext, useState, useEffect} from "react";
import {UserContext} from "../UserContext.jsx";
import {useNavigate} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {data} from "./DataBase.jsx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function PaginaServicos() {
    const { selectedService, setSelectedService } = useContext(UserContext);
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (selectedItem) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [selectedItem]);

    function handleReturnButtonClick() {
        console.log("Button clicked: Return");
        setSelectedService(null);
        navigate(`/`);
    }

    function handleGridItemClick(item) {
        setSelectedItem(item);
    }

    function GridComponent() {
        return (
            <div className="grid-container">
                {data[selectedService]?.map(item => (
                    <div key={item.id} className="grid-item"
                         style={{ '--hover-color': item.color }}
                         onClick={() => handleGridItemClick(item)}>
                        <img src={item.image} alt={item.name} className="grid-image"/>
                        <p className="grid-name">{item.name}</p>
                        <i className="bi bi-eye-fill"></i>
                    </div>
                ))}
            </div>
        );
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <main className={"mainCommon services"}>
            <h2>{capitalizeFirstLetter(selectedService)}</h2>
            <GridComponent />
            <div className={"box-buttons"}>
                <button onClick={handleReturnButtonClick}><i className="bi bi-arrow-left"></i> Voltar</button>
            </div>
            {selectedItem && (
                <Popup open={true} closeOnDocumentClick onClose={() => setSelectedItem(null)}>
                    <div className="popup-content inside" style={{'--item-color': selectedItem.color}}>
                        <div className={"box"}>
                            <div className={"left-box"}>
                                <h3 className={"h3-title"}>{selectedItem.name}</h3>
                                <p className={"p-paragraph"}>{selectedItem.description}</p>
                                <p className={"p-paragraph"}>{selectedItem.contact}</p>
                                <img src={selectedItem.image} alt={selectedItem.name} className="popup-image"/>
                                <div className={"box-buttons popup"}>
                                    <button onClick={() => setSelectedItem(null)}>Fechar</button>
                                </div>
                            </div>
                            {selectedItem.extra && (
                                <div className={"right-box"}>
                                    <img src={selectedItem.extra} alt={selectedItem.name} className="popup-extra"/>
                                </div>
                            )}
                        </div>
                    </div>
                </Popup>
            )}
        </main>
    );
}