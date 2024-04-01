import { PseudoSocketItem, PseudoSocketItemChild } from "../services/pseudo-socket/models/pseudo-socket-item.model";
import { TrackByFunction } from "@angular/core";

export class Item {
  public readonly id: number;
  public readonly int: number;
  public readonly float: string;
  public readonly color: string;
  public readonly child: ItemChild;

  constructor(
    private readonly _id: number,
    private readonly _int: number,
    private readonly _float: number,
    private readonly _color: string,
    private readonly _child: PseudoSocketItemChild,
  ) {
    this.id = this._id;
    this.int = this._int;
    this.float = this._float.toPrecision(18);
    this.color = this._color;
    this.child = new ItemChild(this._child.id, this._child.color);
  }
}

export class ItemChild {
  public readonly id: number;
  public readonly color: string;

  constructor(
    private readonly _id: number,
    private readonly _color: string,
  ) {
    this.id = this._id;
    this.color = this._color;
  }
}

export function mapPseudoSocketItemToItem({id, int, float, color, child}: PseudoSocketItem): Item {
    return new Item(id, int, float, color, child);
}

export const tackByItem: TrackByFunction<Item> = (index, item) => `${item.id}_${item.float}`;
