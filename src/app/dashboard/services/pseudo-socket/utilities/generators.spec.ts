import { generateColor, generateData, generateFloat, generateInt, generateItem, getRandom } from "./generators";
import { PseudoSocketItem } from "../models/pseudo-socket-item.model";
import createSpy = jasmine.createSpy;

export const fakePseudoSocketItemRandom: PseudoSocketItem = {
  id: 1,
  int: 1,
  float: 1,
  color: '#1',
  child: {
    id: 1,
    color: '#1'
  }
};

describe('Generators', () => {
  it('should getRandom', () => {
    spyOn(Math, 'random').and.returnValue(0.1);
    expect(getRandom(1)).toEqual(0.1)
  });

  it('should generateInt', () => {
    spyOn(Math, 'random').and.returnValue(1);
    spyOn(Math, 'floor').and.returnValue(1);
    expect(generateInt()).toEqual(1)
  });

  it('should generateFloat', () => {
    spyOn(Math, 'random').and.returnValue(0.1);
    spyOn(window, 'parseFloat').and.returnValue(0.1);;
    expect(generateFloat()).toEqual(0.1);
  });

  it('should generateColor rgb', () => {
    spyOn(Math, 'random').and.returnValue(0);
    spyOn(Math, 'floor').and.returnValue(0);
    const str = 'rgb' + '(0, 0, 0)'
    expect(generateColor()).toEqual(str);
  });

  it('should generateColor hex', () => {
    spyOn(Math, 'random').and.returnValue(1);
    spyOn(Math, 'floor').and.returnValue(1);
    spyOn(Number.prototype, "toString").and.returnValue('1')
    expect(generateColor()).toEqual('#1');
  });

  it('should generateColor default', () => {
    spyOn(Math, 'random').and.returnValue(20);
    expect(generateColor()).toEqual('');
  });

  it('should generateColor string', () => {
    spyOn(Math, 'random').and.returnValue(2);
    spyOn(Math, 'floor').and.returnValue(2);
    expect(generateColor()).toEqual('blue');
  });

  it('should generateItem', () => {
    spyOn(Math, 'random').and.returnValue(1);
    spyOn(Math, 'floor').and.returnValue(1);
    spyOn(window, 'parseFloat').and.returnValue(1);
    spyOn(Number.prototype, "toString").and.returnValue('1');
    expect(generateItem(1, 1)).toEqual(fakePseudoSocketItemRandom);
  });

  it('should generateData', () => {
    expect(generateData(1)).toHaveSize(1);
  });
});
