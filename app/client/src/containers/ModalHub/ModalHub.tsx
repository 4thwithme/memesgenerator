import React, { useContext } from "react";

import ReactDOM from "react-dom";

import { lazyComponents } from "../../client.utils";

import { ModalContext } from "../../context/ModalProvider/ModalProvider";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";

import { IModal } from "../../client.types";

const ModalHub = () => {
  const { modalsList } = useContext(ModalContext);
  const modalRoot = document.getElementById("modal-root");

  const renderModal = (modalObject: IModal) => {
    const Component: any = lazyComponents[modalObject.name];

    return <Component key={modalObject.name} {...modalObject.props} />;
  };

  if (!modalsList.length) {
    return null;
  }

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <ModalWrapper>
        <>{modalsList.map((modalObject) => renderModal(modalObject))}</>
      </ModalWrapper>,
      modalRoot
    )
  );
};

export default ModalHub;
