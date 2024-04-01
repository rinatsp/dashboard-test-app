import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { DashboardApiService } from "../services/api/dashboard-api.service";
import { createDashboardApiServiceMock } from "../services/api/dashboard-api.service.spec";
import { DataControllerService } from "../services/data-controller.service";
import { createDataControllerServiceMock } from "../services/data-controller.service.spec";
import { first, Observable, of, Subject } from "rxjs";
import { fakeItem } from "../models/item.model.spec";
import { Item } from "../models/item.model";

export function asSubject<T>(observable: Observable<T>): Subject<T> {
  return observable as Subject<T>;
}

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DataTableComponent ],
      providers: [
        {
          provide: DashboardApiService,
          useValue:createDashboardApiServiceMock()
        },
        {
          provide: DataControllerService,
          useValue:createDataControllerServiceMock()
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should latest additionalIds$ empty', () => {
    const listSpy = jasmine.createSpy('list');

    const {list$} = TestBed.inject(DashboardApiService)  as jasmine.SpyObj<DashboardApiService>;
    const {additionalIds$} = TestBed.inject(DataControllerService)  as jasmine.SpyObj<DataControllerService>;
    asSubject(list$ ).next([fakeItem]);

    asSubject(additionalIds$).next([]);

    component.list$
      .pipe(first())
      .subscribe(listSpy);

    expect(listSpy).toHaveBeenCalledWith([fakeItem]);
  });

  it('should latest additionalIds$ not empty', () => {
    const listSpy = jasmine.createSpy('list');

    const {list$} = TestBed.inject(DashboardApiService)  as jasmine.SpyObj<DashboardApiService>;
    const {additionalIds$} = TestBed.inject(DataControllerService)  as jasmine.SpyObj<DataControllerService>;

    asSubject(additionalIds$).next([2,24]);
    asSubject(list$).next([fakeItem]);

    component.list$
      .pipe(first())
      .subscribe(listSpy);

    expect(listSpy).toHaveBeenCalledWith([fakeItem]);
  });
});
