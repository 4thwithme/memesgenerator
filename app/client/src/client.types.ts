export interface StringObject {
  [key: string]: string;
}

export interface AnyObject {
  [key: string]: any;
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
