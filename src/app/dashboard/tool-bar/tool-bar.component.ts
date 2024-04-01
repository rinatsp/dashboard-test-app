import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { combineLatest, debounceTime, distinctUntilChanged, filter, takeUntil, tap } from "rxjs";
import { DataControllerService } from "../services/data-controller.service";
import { AMOUNT_OF_DISPLAY } from "../data-table/data-table.component";
import { Unsubscribable } from "../../utilities/unsubscribable";

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolBarComponent extends Unsubscribable{
  public readonly form: FormGroup;

  constructor(
    private readonly _dataControllerService: DataControllerService
  ) {
    super();

    this.form = new FormGroup({
      timeInterval: new FormControl<number>(300, [Validators.required, Validators.min(0)]),
      arraySize: new FormControl<number>(1000, [Validators.required, Validators.min(1)]),
      additionalIds: new FormControl<string | undefined>(undefined, [Validators.pattern(/^\d+(,\d+)*$/)])
    });

    const {
      timeInterval,
      arraySize,
      additionalIds
    } = this.form.controls;

    combineLatest([
      timeInterval.valueChanges,
      timeInterval.statusChanges
    ])
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this._destroy),
        filter(([_, status]) => status === 'VALID'),
      )
      .subscribe(([value, _]) => this._dataControllerService.changeInterval(value));

    combineLatest([
      arraySize.valueChanges,
      arraySize.statusChanges
    ])
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this._destroy),
        filter(([_, status]) => status === 'VALID'),
      )
      .subscribe(([value, _]) => this._dataControllerService.changeArraySize(value));

    combineLatest([
      additionalIds.valueChanges,
      additionalIds.statusChanges
    ])
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this._destroy),
        filter(([_, status]) => status === 'VALID'),
      )
      .subscribe(([value, _]) =>
        this._dataControllerService.changeAdditionalIdsSubject(
          value.length > 0 ? value.split(',').map(Number).slice(0, AMOUNT_OF_DISPLAY) : []
        )
      );
  }
}
