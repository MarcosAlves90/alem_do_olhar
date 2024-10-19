import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext.jsx";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { data } from "./DataBase.jsx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PropTypes from "prop-types";

const GridComponent = ({ items, onItemClick }) => (
    <div className="grid-container">
        {items.map(item => (
            <div
                key={item.id}
                className="grid-item"
                style={{ '--hover-color': item.color }}
                onClick={() => onItemClick(item)}
            >
                <img src={item.image} alt={item.name} className="grid-image" />
                <p className="grid-name">{item.name}</p>
                <i className="bi bi-eye-fill"></i>
            </div>
        ))}
    </div>
);

GridComponent.propTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
};

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
        <p
            className="p-paragraph contact"
            onClick={type === "Instagram" ? () => handleInstagramClick(contact.replace("@", "")) : null}
            style={{ cursor: type === "Instagram" ? 'pointer' : 'default' }}
        >
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
        const matchedType = Object.entries(contactTypes).find(([prefix]) => c.startsWith(prefix));
        return <ContactItem key={index} type={matchedType ? matchedType[1] : "Other"} contact={c.replace(matchedType ? matchedType[0] : "", "").trim()} />;
    });
};

const PopupContent = ({ item, onClose, mobileSelectedExtra, setMobileSelectedExtra, selectedExtra, setSelectedExtra }) => {
    const handleArrowButtonClick = (direction, max) => {
        if (direction === 'right' && mobileSelectedExtra < max - 1) {
            setMobileSelectedExtra(mobileSelectedExtra + 1);
        } else if (direction === 'left' && mobileSelectedExtra > -1) {
            setMobileSelectedExtra(mobileSelectedExtra - 1);
        }
    };

    const handleRightBoxImageClick = () => {
        setSelectedExtra((selectedExtra + 1) % item.extra.length);
    };

    return (
        <Popup open closeOnDocumentClick onClose={onClose}>
            <div className={`popup-content inside ${item.extra.length > 0 ? "" : "one"}`} style={{ '--item-color': item.color }}>
                <i className="bi bi-eye-fill"></i>
                <div className="box">
                    <div className="left-box">
                        {mobileSelectedExtra === -1 ? (
                            <>
                                <img src={item.image} alt={item.name} className="popup-image" />
                                <h3 className="h3-title">{item.name}</h3>
                                <p className="p-paragraph description">{item.description}</p>
                                {formatContact(item.contact)}
                            </>
                        ) : (
                            <div className="right-box mobile">
                                <img src={item.extra[mobileSelectedExtra]} alt={item.name} className="popup-extra" />
                            </div>
                        )}
                        <div className="box-buttons popup">
                            {mobileSelectedExtra > -1 && (
                                <button className="button-arrow" onClick={() => handleArrowButtonClick('left')}>
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                            )}
                            <button
                                className={`button-close ${mobileSelectedExtra === item.extra.length - 1 && item.extra.length > 0 ? "small-left-margin" : mobileSelectedExtra > -1 ? "center" : item.extra.length > 0 ? "small" : "center"}`}
                                onClick={onClose}
                            >
                                Fechar
                            </button>
                            {item.extra.length > mobileSelectedExtra + 1 && (
                                <button className="button-arrow" onClick={() => handleArrowButtonClick('right', item.extra.length)}>
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    {item.extra.length > 0 && (
                        <div className="right-box">
                            {item.extra.length > 1 && (
                                <i className="bi bi-hand-index-thumb-fill"></i>
                            )}
                            <img
                                src={item.extra[selectedExtra]}
                                alt={item.name}
                                onClick={handleRightBoxImageClick}
                                className={`popup-extra ${item.extra.length < 2 ? "no-click" : ""}`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Popup>
    );
};

PopupContent.propTypes = {
    item: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    mobileSelectedExtra: PropTypes.number.isRequired,
    setMobileSelectedExtra: PropTypes.func.isRequired,
    selectedExtra: PropTypes.number.isRequired,
    setSelectedExtra: PropTypes.func.isRequired
};

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

    const generateTitle = (title) => ({
        "comidas": "Comidas/Doces",
        "estetica": "Estética",
        "manicure": "Manicure",
        "terapias": "Terapias",
        "acessorios": "Acessórios",
        "servicos-comunitarios": "Serviços Comunitários"
    }[title]);

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
            <GridComponent items={data[selectedService] || []} onItemClick={handleGridItemClick} />
            <div className="box-buttons">
                <button className="center small" onClick={handleReturnButtonClick}>
                    <i className="bi bi-arrow-left"></i> Voltar
                </button>
            </div>
            {selectedItem && (
                <PopupContent
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    mobileSelectedExtra={mobileSelectedExtra}
                    setMobileSelectedExtra={setMobileSelectedExtra}
                    selectedExtra={selectedExtra}
                    setSelectedExtra={setSelectedExtra}
                />
            )}
        </main>
    );
}
