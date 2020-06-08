import React, { createContext, useState } from "react";

import { IModalContext, IModal, AnyObject } from "../../client.types";

const ModalContext = createContext<IModalContext>({
  modalsList: [],
  addModal: (name: string, props: AnyObject) => {},
  removeModal: (name: string) => {}
});

const ModalProvider = (props: any) => {
  const [modalsList, setModalsList] = useState<IModal[]>([]);

  const addModal = (name: string, props: AnyObject) =>
    setModalsList((prev) => [...prev, { name, props }]);

  const removeModal = (name: string) =>
    setModalsList((prev) => prev.filter((modal) => modal.name !== name));

  return <ModalContext.Provider {...props} value={{ modalsList, addModal, removeModal }} />;
};

export { ModalProvider, ModalContext };
