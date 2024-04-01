import { Injectable } from '@angular/core';
import { DashboardApiService } from "./api/dashboard-api.service";
import { BehaviorSubject, combineLatest, Observable, skip, takeUntil, tap } from "rxjs";
import { Options } from "./pseudo-socket/models/pseudo-socket-action.model";
import { Unsubscribable } from "../../utilities/unsubscribable";

export const DEFAULT_TIME_INTERVAL = 300;
export const DEFAULT_ARRAY_SIZE = 1000;

@Injectable()
export class DataControllerService extends Unsubscribable{
  public readonly additionalIds$: Observable<number[]>;

  private readonly _timeIntervalSubject$: BehaviorSubject<number>;
  private readonly _arraySizeSubject$: BehaviorSubject<number>;
  private readonly _additionalIdsSubject$: BehaviorSubject<number[]>;

  constructor(
    private readonly _dashboardApiService: DashboardApiService
  ) {
    super();

    this._timeIntervalSubject$ = new BehaviorSubject<number>(DEFAULT_TIME_INTERVAL);
    this._arraySizeSubject$ = new BehaviorSubject<number>(DEFAULT_ARRAY_SIZE);
    this._additionalIdsSubject$ = new BehaviorSubject<number[]>([]);
    this.additionalIds$ = this._additionalIdsSubject$ as Observable<number[]>;

    combineLatest([
      this._timeIntervalSubject$,
      this._arraySizeSubject$
    ])
      .pipe(
        takeUntil(this._destroy),
        tap(([timeInterval, arraySize]) => this.startDataProducing({timeInterval, arraySize}))
      )
      .subscribe();
  }

  public startDataProducing(options: Options): void {
    this._dashboardApiService.startAction(options);
  }

  public stopDataProducing(): void {
    this._dashboardApiService.stopAction();
  }

  public changeInterval(interval: number): void {
      this._timeIntervalSubject$.next(interval);
  }

  public changeArraySize(arraySize: number): void {
    this._arraySizeSubject$.next(arraySize);
  }

  public changeAdditionalIdsSubject(ids: number[]): void {
    this._additionalIdsSubject$.next(ids);
  }
}
