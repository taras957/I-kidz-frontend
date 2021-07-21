import React from "react";

const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <ModalContext.Provider value={[modalIsOpen, setIsOpen]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("You should use useModal inside ModalContext");
  }
  const [modalIsOpen, setIsOpen] = context;

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return { open: openModal, close: closeModal, isOpen: modalIsOpen };
};
