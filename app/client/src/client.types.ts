import { DropEvent } from "react-dropzone";

export interface StringObject {
  [key: string]: string;
}

export interface AnyObject {
  [key: string]: any;
}
export interface NumberObject {
  [key: string]: number;
}

export interface IValidationError extends StringObject {}

export interface IValuesValidationItem {
  value: string;
  error: IValidationError;
}

export interface IRegistrationValuesValidation {
  [key: string]: IValuesValidationItem;
}

export interface IMemUpload {
  file: string | ArrayBuffer | null;
  url: string | null;
  internalUrl: string | null;
  name: string;
  memSrc: "none";
  createdAt: string;
  authorId: string;
  tags: StringObject;
}

export interface IMem {
  id: string;
  file: string;
  name: string;
  memSrc: string;
  createdAt: string;
  authorId: string;
  tags: StringObject;
}

export interface IUser extends StringObject {}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IAuthContext {
  user: null | IUser;
  login: (userData: IUser) => void;
  logout: () => void;
}

export interface IPropsUploadZone {
  setMem: (some: any) => void;
  handleUpload: <T extends File>(acceptedFiles: T[], rejectedFiles: T[], event: DropEvent) => void;
  handleUploadFromURL: (url: string) => void;
}

export interface IPropsNewMemCard {
  mem: IMemUpload;
  handleOnNameChange: (e: any) => void;
  handleOnTagChange: (e: any, num: string) => void;
  isDisabled: () => boolean;
  handleSubmit: () => void;
  setMem: (some: any) => void;
}

export interface IMemesCreatorProps {
  src: string | null;
}

export interface IModalWrapperProps {
  children: JSX.Element;
}

export type IModal = { name: string; props: AnyObject };

export interface IModalContext {
  modalsList: IModal[];
  addModal: (name: string, props: AnyObject) => void;
  removeModal: (name: string) => void;
}

export interface IRangeProps {
  classNamePrefix: string;
  min: number;
  max: number;
  onUpdate: (value: number) => void;
  currentValue: number;
}

export interface ISelectedItem {
  value: any;
  label: "string";
}
