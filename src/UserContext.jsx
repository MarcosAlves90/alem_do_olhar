import {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [selectedService, setSelectedService] = useState("/");
    const serviceNames = ["acessorios", "comidas", "estetica", "manicure", "terapias", "servicos-comunitarios"];

    useEffect(() => {
        const currentPath = window.location.pathname.substring(1);
        if (serviceNames.includes(currentPath)) {
            setSelectedService(currentPath);
        }
    }, []);

    return (
        <UserContext.Provider value={{ selectedService, setSelectedService }}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};