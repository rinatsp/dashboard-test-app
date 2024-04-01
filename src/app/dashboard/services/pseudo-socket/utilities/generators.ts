import { PseudoSocketItem } from "../models/pseudo-socket-item.model";

export function generateData(arraySize: number): PseudoSocketItem[] {
  return Array.from({length: arraySize}, (_, index) => generateItem(index, arraySize));
}

export function generateItem(id: number, arraySize: number): PseudoSocketItem {
  return {
    id,
    int: generateInt(),
    float: generateFloat(),
    color: generateColor(),
    child: {
      id: Math.floor(getRandom(arraySize)),
      color: generateColor()
    }
  }
}

export function generateInt(): number {
  return Math.floor(getRandom(1000000));
}

export function generateFloat(): number {
  return parseFloat((getRandom(100)).toFixed(18));
}

export const getRandom = (range: number) => Math.random() * range;

export function generateColor(): string {
  const types = ['rgb', 'hex', 'str'];

  switch (types[Math.floor(getRandom(types.length))]) {
    case 'rgb':
      return `rgb(${Math.floor(getRandom(256))}, ${Math.floor(getRandom(256))}, ${Math.floor(getRandom(256))})`;
    case 'hex':
      return `#${Math.floor(getRandom(16777215)).toString(16)}`
    case 'str':
      const colors = ['red', 'yellow', 'blue', 'green'];
      return colors[Math.floor(getRandom(colors.length))];
    default:
      return '';
  }
}


