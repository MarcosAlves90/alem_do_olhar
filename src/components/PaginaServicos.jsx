import {useContext, useState, useEffect} from "react";
import {UserContext} from "../UserContext.jsx";
import {useNavigate} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {data} from "./DataBase.jsx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PropTypes from "prop-types";

export default function PaginaServicos() {
    const { selectedService, setSelectedService } = useContext(UserContext);
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(null);
    const [secondPage, setSecondPage] = useState(false);


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

    function generateTitle(title) {
        const titlesMap = {
            "comidas": "Comidas/Doces",
            "estetica": "Estética",
            "manicure": "Manicure",
            "terapias": "Terapias",
            "acessorios": "Acessórios",
            "servicos-comunitarios": "Serviços Comunitários"
        };

        return titlesMap[title];
    }

    function ContactItem({ type, contact }) {
        const iconClasses = {
            "WhatsApp": "bi bi-whatsapp",
            "Telefone": "bi bi-telephone",
            "Instagram": "bi bi-instagram",
            "Email": "bi bi-envelope",
            "Other": ""
        };

        return (
            <p className="p-paragraph contact">
                <i className={iconClasses[type] || iconClasses["Other"]}></i> {contact}
            </p>
        );
    }

    ContactItem.propTypes = {
        type: PropTypes.string.isRequired,
        contact: PropTypes.string.isRequired
    }

    function formatContact(contact) {
        const contactTypes = {
            "WhatsApp:": "WhatsApp",
            "Telefone:": "Telefone",
            "Instagram:": "Instagram",
            "Email:": "Email"
        };

        return contact.split('|').map((c, index) => {
            c = c.trim();
            for (const [prefix, type] of Object.entries(contactTypes)) {
                if (c.startsWith(prefix)) {
                    return <ContactItem key={index} type={type} contact={c.replace(prefix, "").trim()} />;
                }
            }
            return <ContactItem key={index} type="Other" contact={c} />;
        });
    }

    useEffect(() => {
        !selectedItem && setSecondPage(false);
    }, [selectedItem]);

    useEffect(() => {
        document.body.classList.toggle('no-scroll', !!selectedItem);
    }, [selectedItem]);

    return (
        <main className="mainCommon services">
            <h2 className="h2-title-no-box">{generateTitle(selectedService)}</h2>
            <GridComponent />
            <div className="box-buttons">
                <button className="center small" onClick={handleReturnButtonClick}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </button>
            </div>
            {selectedItem && (
                <Popup open closeOnDocumentClick onClose={() => setSelectedItem(null)}>
                    <div className={`popup-content inside ${selectedItem.extra ? "" : "one"}`} style={{ '--item-color': selectedItem.color }}>
                        <i className="bi bi-eye-fill"></i>
                        <div className="box">
                            <div className="left-box">
                                {!secondPage ? (
                                    <>
                                        <img src={selectedItem.image} alt={selectedItem.name} className="popup-image" />
                                        <h3 className="h3-title">{selectedItem.name}</h3>
                                        <p className="p-paragraph description">{selectedItem.description}</p>
                                        {formatContact(selectedItem.contact)}
                                    </>
                                ) : (
                                    <div className="right-box mobile">
                                        <img src={selectedItem.extra} alt={selectedItem.name} className="popup-extra" />
                                    </div>
                                )}
                                <div className="box-buttons popup">
                                    <button className={`button-close ${selectedItem.extra ? "small" : "center"}`} onClick={() => setSelectedItem(null)}>
                                        Fechar
                                    </button>
                                    {selectedItem.extra && (
                                        <button className={`button-arrow ${secondPage ? "left" : ""}`} onClick={() => setSecondPage(!secondPage)}>
                                            <i className={`bi bi-arrow-${secondPage ? "left" : "right"}`}></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {selectedItem.extra && (
                                <div className="right-box">
                                    <img src={selectedItem.extra} alt={selectedItem.name} className="popup-extra" />
                                </div>
                            )}
                        </div>
                    </div>
                </Popup>
            )}
        </main>
    );
}