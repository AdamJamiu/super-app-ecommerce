import { createContext, useContext, useState } from "react";

export const AppProvider = createContext();

export const AppContext = ({ children }) => {
    const [cartLength, setCartLength] = useState(0);
    const [isSignedInModal, setIsSignednInModal] = useState(false); // signon modal open
    // let isSignedInModal = false;

    const handleSignInOpen = () => setIsSignednInModal(true);
    const handleSignInClose = () => setIsSignednInModal(false);

    const values = {
        cartLength,
        setCartLength,
        isSignedInModal,
        setIsSignednInModal,
        handleSignInOpen,
        handleSignInClose
    }

    return (
        <AppProvider.Provider value={values}>
            {children}
        </AppProvider.Provider>
    );
}

export const useAppContext = () => useContext(AppProvider);