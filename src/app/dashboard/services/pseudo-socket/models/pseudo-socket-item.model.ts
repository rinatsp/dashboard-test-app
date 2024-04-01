export interface PseudoSocketItem {
  id: number;
  int: number;
  float: number;
  color: string;
  child: PseudoSocketItemChild;
}

export interface PseudoSocketItemChild {
  id: number;
  color: string;
}
