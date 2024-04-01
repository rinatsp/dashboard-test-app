import { Item, mapPseudoSocketItemToItem, tackByItem } from "./item.model";
import { fakePseudoSocketItem } from "../services/pseudo-socket/models/pseudo-socket-item.model.spec";

export const fakeItem: Item = new Item(1, 10000, 1.23330000000000006, 'white', {id: 2, color: 'black'});

describe('Item', () => {
  it('should mapPseudoSocketItemToItem', () => {
    expect(mapPseudoSocketItemToItem(fakePseudoSocketItem))
      .toEqual(fakeItem);
  });

  it('should tackByItem', () => {
    expect(tackByItem(0, fakeItem))
      .toEqual(`${fakeItem.id}_${fakeItem.float}`);
  });
});
