import { Injectable, OnDestroy } from '@angular/core';
import {
  Options, PseudoSocketActionStart,
  PseudoSocketActionStop,
  PseudoSocketActionType
} from "../pseudo-socket/models/pseudo-socket-action.model";
import { BehaviorSubject, map, Observable } from "rxjs";
import { PseudoSocketItem } from "../pseudo-socket/models/pseudo-socket-item.model";
import { Item, mapPseudoSocketItemToItem } from "../../models/item.model";

@Injectable()
export class DashboardApiService implements OnDestroy  {
  public readonly list$: Observable<Item[]>;

  private readonly _listSubject$: BehaviorSubject<PseudoSocketItem[]>;
  private readonly _worker: Worker;
  constructor() {
      this._worker = new Worker(new URL('../pseudo-socket/pseudo-socket.worker.ts', import.meta.url));
      this._listSubject$ = new BehaviorSubject<PseudoSocketItem[]>([]);
      this.list$ = (this._listSubject$ as Observable<PseudoSocketItem[]>)
        .pipe(
          map(list => list.map(mapPseudoSocketItemToItem))
        );

      this._worker.onmessage = ({ data }: { data: PseudoSocketItem[] }) => this._listSubject$.next(data);
  }

  public stopAction(): void {
    const action: PseudoSocketActionStop = {
      action: PseudoSocketActionType.STOP
    }
    this._worker.postMessage(action);
    this._worker.terminate();
  }

  public startAction(options: Options): void {
    const action: PseudoSocketActionStart = {
      action: PseudoSocketActionType.START,
      options
    }
    this._worker.postMessage(action);
  }

  ngOnDestroy(): void {
    this.stopAction();
  }
}
