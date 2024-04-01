import { TestBed } from '@angular/core/testing';

import { DashboardApiService } from './dashboard-api.service';
import {
  PseudoSocketActionStart,
  PseudoSocketActionStop,
  PseudoSocketActionType
} from "../pseudo-socket/models/pseudo-socket-action.model";
import { DEFAULT_ARRAY_SIZE, DEFAULT_TIME_INTERVAL } from "../data-controller.service";
import { of, ReplaySubject, take } from "rxjs";
import { fakeItem } from "../../models/item.model.spec";

export function createDashboardApiServiceMock(): jasmine.SpyObj<DashboardApiService> {
  const mock = jasmine.createSpyObj('DashboardApiService', [
    'stopAction',
    'startAction'
  ]);

  mock.list$ = new ReplaySubject(1);

  return mock;
}
describe('DashboardApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardApiService
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(DashboardApiService);
    expect(service).toBeTruthy();
  });


  it('should be stopAction', () => {
    const action: PseudoSocketActionStop = {
      action: PseudoSocketActionType.STOP
    }
    const service = TestBed.inject(DashboardApiService);
    const terminate= spyOn(Worker.prototype, 'terminate');
    const postMessage= spyOn(Worker.prototype, 'postMessage');

    service.stopAction();

    expect(terminate).toHaveBeenCalled();
    expect(postMessage).toHaveBeenCalledWith(action);
  });

  it('should be startAction', () => {
    const action: PseudoSocketActionStart = {
      action: PseudoSocketActionType.START,
      options: {
        timeInterval: DEFAULT_TIME_INTERVAL,
        arraySize: DEFAULT_ARRAY_SIZE
      }
    }
    const service = TestBed.inject(DashboardApiService);
    const postMessage= spyOn(Worker.prototype, 'postMessage');

    service.startAction(action.options);

    expect(postMessage).toHaveBeenCalledWith(action);
  });

  it('should be list$', () => {
    const action: PseudoSocketActionStart = {
      action: PseudoSocketActionType.START,
      options: {
        timeInterval: DEFAULT_TIME_INTERVAL,
        arraySize: DEFAULT_ARRAY_SIZE
      }
    }
    const spy = jasmine.createSpy('List');
    const service = TestBed.inject(DashboardApiService);
    const messageSpy = spyOn(<any>service["_worker"], 'onmessage');
    service.startAction(action.options);

    service.list$
      .pipe(
        take(1)
      ).subscribe(spy)
    expect(spy).toHaveBeenCalledWith([]);
  });
});
