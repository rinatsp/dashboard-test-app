import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ToolBarComponent } from './tool-bar.component';
import { DataControllerService } from "../services/data-controller.service";
import { createDataControllerServiceMock } from "../services/data-controller.service.spec";
import { of } from "rxjs";

describe('ToolBarComponent', () => {
  let component: ToolBarComponent;
  let fixture: ComponentFixture<ToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DataControllerService,
          useValue:createDataControllerServiceMock()
        },
      ],
      imports: [ ToolBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should change timeInterval', fakeAsync(() => {
    const {changeInterval} = fixture.debugElement.injector.get(DataControllerService)  as jasmine.SpyObj<DataControllerService>;
    component.form.patchValue({
      timeInterval: 200
    });
    fixture.detectChanges();
    tick(301);
    expect(changeInterval).toHaveBeenCalledWith(200);
  }));

  it('should change arraySize', fakeAsync(() => {
    const {changeArraySize} = fixture.debugElement.injector.get(DataControllerService)  as jasmine.SpyObj<DataControllerService>;
    component.form.patchValue({
      arraySize: 200
    });
    fixture.detectChanges();
    tick(301);
    expect(changeArraySize).toHaveBeenCalledWith(200);
  }));

  it('should change changeAdditionalIds', fakeAsync(() => {
    const {changeAdditionalIdsSubject} = fixture.debugElement.injector.get(DataControllerService)  as jasmine.SpyObj<DataControllerService>;
    component.form.patchValue({
      additionalIds: '1,2'
    });
    fixture.detectChanges();
    tick(301);
    expect(changeAdditionalIdsSubject).toHaveBeenCalledWith([1,2]);
  }));
});
