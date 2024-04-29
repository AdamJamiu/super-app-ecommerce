import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [isSignedInModal, setIsSignednInModal] = useState(false); // signon modal open
  // let isSignedInModal = false;

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleSignInOpen = () => setIsSignednInModal(true);
  const handleSignInClose = () => setIsSignednInModal(false);

  const values = {
    cartLength,
    setCartLength,
    isSignedInModal,
    setIsSignednInModal,
    handleSignInOpen,
    handleSignInClose,
    isCartOpen,
    handleCloseCart,
    handleOpenCart,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppProvider);
