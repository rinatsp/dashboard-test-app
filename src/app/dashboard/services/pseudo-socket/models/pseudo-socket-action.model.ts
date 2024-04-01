export enum PseudoSocketActionType {
  START = 'START',
  STOP = 'STOP'
}

export interface Options {
  timeInterval: number;
  arraySize: number;
}

export type PseudoSocketAction = PseudoSocketActionStart | PseudoSocketActionStop;

export interface PseudoSocketActionStart {
  action: PseudoSocketActionType.START;
  options: Options;
}

export interface PseudoSocketActionStop {
  action: PseudoSocketActionType.STOP;
}

