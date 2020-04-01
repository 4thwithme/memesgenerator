export interface StringObect {
  [key: string]: string;
}

export interface AnyObject {
  [key: string]: any;
}

export interface IValidationError extends StringObect {}

export interface IValuesValidationItem {
  value: string;
  error: IValidationError;
}

export interface IRegistrationValuesValidation {
  [key: string]: IValuesValidationItem;
}
