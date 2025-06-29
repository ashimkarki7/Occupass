export type VariableLiteral = string | number | boolean;

export interface IObjectLiteral<T = VariableLiteral> {
  [key: string]: T | any;
}

