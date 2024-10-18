import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext.jsx";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { data } from "./DataBase.jsx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PropTypes from "prop-types";

export default function PaginaServicos() {
    const { selectedService, setSelectedService } = useContext(UserContext);
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const [mobileSelectedExtra, setMobileSelectedExtra] = useState(-1);
    const [selectedExtra, setSelectedExtra] = useState(0);

    const handleReturnButtonClick = () => {
        setSelectedService(null);
        navigate(`/`);
    };

    const handleGridItemClick = (item) => setSelectedItem(item);

    const GridComponent = () => (
        <div className="grid-container">
            {data[selectedService]?.map(item => (
                <div key={item.id} className="grid-item" style={{ '--hover-color': item.color }} onClick={() => handleGridItemClick(item)}>
                    <img src={item.image} alt={item.name} className="grid-image" />
                    <p className="grid-name">{item.name}</p>
                    <i className="bi bi-eye-fill"></i>
                </div>
            ))}
        </div>
    );

    const generateTitle = (title) => ({
        "comidas": "Comidas/Doces",
        "estetica": "Estética",
        "manicure": "Manicure",
        "terapias": "Terapias",
        "acessorios": "Acessórios",
        "servicos-comunitarios": "Serviços Comunitários"
    }[title]);

    const ContactItem = ({ type, contact }) => {
        const iconClasses = {
            "WhatsApp": "bi bi-whatsapp",
            "Telefone": "bi bi-telephone",
            "Instagram": "bi bi-instagram",
            "Email": "bi bi-envelope",
            "Other": ""
        };

        const handleInstagramClick = (instagramHandle) => {
            window.open(`https://instagram.com/${instagramHandle}`, '_blank', 'noopener,noreferrer');
        };

        return (
            <p className="p-paragraph contact" onClick={type === "Instagram" ? () => handleInstagramClick(contact.replace("@", "")) : null} style={{ cursor: type === "Instagram" ? 'pointer' : 'default' }}>
                <i className={iconClasses[type] || iconClasses["Other"]}></i> {contact}
            </p>
        );
    };

    ContactItem.propTypes = {
        type: PropTypes.string.isRequired,
        contact: PropTypes.string.isRequired
    };

    const formatContact = (contact) => {
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
    };

    const handleRightArrowButtonClick = (extras) => {
        if (mobileSelectedExtra !== extras - 1) setMobileSelectedExtra(mobileSelectedExtra + 1);
    };

    const handleLeftArrowButtonClick = () => {
        if (mobileSelectedExtra !== -1) setMobileSelectedExtra(mobileSelectedExtra - 1);
    };

    const returnRightBoxImageSrc = () => {
        return selectedItem.extra[selectedExtra];
    };

    const handleRightBoxImageClick = () => {
        if ((selectedItem.extra.length - 1) > selectedExtra) {
            setSelectedExtra(selectedExtra + 1);
        } else {
            setSelectedExtra(0);
        }
    }

    useEffect(() => {
        if (!selectedItem) {
            setMobileSelectedExtra(-1);
            setSelectedExtra(0);
        }
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
                    <div className={`popup-content inside ${selectedItem.extra.length > 0 ? "" : "one"}`}
                         style={{'--item-color': selectedItem.color}}>
                        <i className="bi bi-eye-fill"></i>
                        <div className="box">
                            <div className="left-box">
                                {mobileSelectedExtra === -1 ? (
                                    <>
                                        <img src={selectedItem.image} alt={selectedItem.name} className="popup-image"/>
                                        <h3 className="h3-title">{selectedItem.name}</h3>
                                        <p className="p-paragraph description">{selectedItem.description}</p>
                                        {formatContact(selectedItem.contact)}
                                    </>
                                ) : (
                                    <div className="right-box mobile">
                                        <img src={selectedItem.extra[mobileSelectedExtra]} alt={selectedItem.name}
                                             className="popup-extra"/>
                                    </div>
                                )}
                                <div className="box-buttons popup">
                                    {mobileSelectedExtra > -1 && (
                                        <button className="button-arrow" onClick={handleLeftArrowButtonClick}>
                                            <i className="bi bi-arrow-left"></i>
                                        </button>
                                    )}
                                    <button
                                        className={`button-close ${mobileSelectedExtra > -1 && mobileSelectedExtra < (selectedItem.extra.length - 1) ? "center" : mobileSelectedExtra === (selectedItem.extra.length - 1) && selectedItem.extra.length > 0 ? "small-left-margin" : selectedItem.extra.length > 0 ? "small" : "center"}`}
                                        onClick={() => setSelectedItem(null)}>
                                        Fechar
                                    </button>
                                    {selectedItem.extra && mobileSelectedExtra < (selectedItem.extra.length - 1) && (
                                        <button className="button-arrow"
                                                onClick={() => handleRightArrowButtonClick(selectedItem.extra.length)}>
                                            <i className="bi bi-arrow-right"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {selectedItem.extra.length > 0 && (
                                <div className="right-box">
                                    {selectedItem.extra.length > 1 && (
                                        <i className="bi bi-hand-index-thumb-fill"></i>
                                    )}
                                    <img src={returnRightBoxImageSrc()} alt={selectedItem.name}
                                         onClick={handleRightBoxImageClick} className={`popup-extra ${selectedItem.extra.length < 2 ? "no-click" : ""}`}/>
                                </div>
                            )}
                        </div>
                    </div>
                </Popup>
            )}
        </main>
    );
}