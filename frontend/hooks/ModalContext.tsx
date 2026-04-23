import { createContext, useState } from "react";

type ModalContextType = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  openModal: false,
  setOpenModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
}
