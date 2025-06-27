export type VariableLiteral = string | number | boolean;

export interface IObjectLiteral<T = VariableLiteral> {
  [key: string]: T | any;
}

export interface Location {
  lat: number;
  lng: number;
  height: number;
}

export interface LocationState {
  payload: Location[];
  error: string | undefined;
  loading: boolean;
}
