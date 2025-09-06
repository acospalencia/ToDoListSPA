import { createContext, useState } from "react";

export const SesionContext = createContext();

export const SesionDataProvider = ({ children }) => {
    
    const [view, setView] = useState("login");

    return (
        <SesionContext.Provider value={{ view, setView }}>
            {children}
        </SesionContext.Provider>
    );
};
