import React from "react";

import "../../styles/ModalWrapper.scss";

import { IModalWrapperProps } from "../../client.types";

const ModalWrapper = (props: IModalWrapperProps) => <div className='modal-wrapper' {...props} />;

export default ModalWrapper;
