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
  author: string | null;
  tags: StringObject;
}

export interface IMem {
  id: string;
  file: string;
  name: string;
  memSrc: string;
  createdAt: string;
  author: string | { id: string; username: string } | null;
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
  setMem: React.Dispatch<React.SetStateAction<IMemUpload>>;
  handleUpload: <T extends File>(acceptedFiles: T[], rejectedFiles: T[], event: DropEvent) => void;
  handleUploadFromURL: (url: string) => void;
}

export interface IPropsNewMemCard {
  mem: IMemUpload;
  setMem: React.Dispatch<React.SetStateAction<IMemUpload>>;
  handleOnNameChange: (e: any) => void;
  handleOnTagChange: (e: any, num: string) => void;
  isDisabled: () => boolean;
  handleSubmit: () => void;
}

export interface IMemesCreatorProps {
  src: string | null;
  setMem: React.Dispatch<React.SetStateAction<IMemUpload>>;
  setActiveTool: (tool: string | null) => void;
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

export interface ICroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
  aspect?: number | undefined;
  utit?: string;
}

export interface IMemText {
  isActive: boolean;
  id: number;
  coords: { x: number; y: number };
  text: string;
  fontSize: number | string;
  color: string;
  maxWidth: number;
}

export type IActiveTool = "text" | "crop" | "square" | null;
