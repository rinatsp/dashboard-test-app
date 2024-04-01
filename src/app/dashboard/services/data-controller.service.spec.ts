import { TestBed } from '@angular/core/testing';

import { DataControllerService, DEFAULT_ARRAY_SIZE, DEFAULT_TIME_INTERVAL } from './data-controller.service';
import { createDashboardApiServiceMock } from "./api/dashboard-api.service.spec";
import { DashboardApiService } from "./api/dashboard-api.service";
import { of, ReplaySubject, take } from "rxjs";
import { fakeItem } from "../models/item.model.spec";


export function createDataControllerServiceMock(): jasmine.SpyObj<DataControllerService> {
  const mock = jasmine.createSpyObj('DataControllerService', [
    'stopDataProducing',
    'changeInterval',
    'changeArraySize',
    'changeAdditionalIdsSubject'
  ]);

  mock.additionalIds$ =  new ReplaySubject(1);

  return mock;
}
describe('DataControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DashboardApiService,
          useValue:createDashboardApiServiceMock()
        },
        DataControllerService
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(DataControllerService);

    expect(service).toBeTruthy();
  });

  it('should be stopDataProducing', () => {
    const service = TestBed.inject(DataControllerService);
    const {stopAction} = TestBed.inject(DashboardApiService);
    service.stopDataProducing();
    expect(stopAction).toHaveBeenCalled();
  });

  it('should be changeInterval', () => {
    const service = TestBed.inject(DataControllerService);
    const {startAction} = TestBed.inject(DashboardApiService);
    service.changeInterval(100)
    expect(startAction)
      .toHaveBeenCalledWith({timeInterval: 100, arraySize: DEFAULT_ARRAY_SIZE});
  });

  it('should be changeArraySize', () => {
    const service = TestBed.inject(DataControllerService);
    const {startAction} = TestBed.inject(DashboardApiService);
    service.changeArraySize(100)
    expect(startAction)
      .toHaveBeenCalledWith({timeInterval: DEFAULT_TIME_INTERVAL, arraySize: 100});
  });

  it('should be changeAdditionalIdsSubject', () => {
    const spy = jasmine.createSpy('Ids');
    const service = TestBed.inject(DataControllerService);
    service.changeAdditionalIdsSubject([1,2])

    service.additionalIds$
      .pipe(
        take(1)
      ).subscribe(spy)
    expect(spy).toHaveBeenCalledWith([1,2]);
  });
});
