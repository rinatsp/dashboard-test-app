import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable, withLatestFrom } from "rxjs";
import { Item, tackByItem } from "../models/item.model";
import { DashboardApiService } from "../services/api/dashboard-api.service";
import { DataControllerService } from "../services/data-controller.service";

export const AMOUNT_OF_DISPLAY = 10;
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  public readonly list$: Observable<Item[]>;

  public readonly trackByItem = tackByItem;

  constructor(
    private readonly _dashboardApiService: DashboardApiService,
    private readonly _dataControllerService: DataControllerService
  ) {
    this.list$ = this._dashboardApiService.list$
      .pipe(
        withLatestFrom(this._dataControllerService.additionalIds$),
        map(([list, additionalIds]) => {
          if(additionalIds.length === 0) {
            return list.slice(-AMOUNT_OF_DISPLAY);
          } else {
            const buffer = 2;
            let resultList = list
              .slice(-AMOUNT_OF_DISPLAY * buffer)
              .filter(({id}) => !additionalIds.some((additionalId) => additionalId === id))
              .slice(-AMOUNT_OF_DISPLAY);
            const additionalItems = list.filter(({id}) =>
              additionalIds.some((additionalId) => additionalId === id));

            resultList = additionalItems.concat(resultList).slice(0, AMOUNT_OF_DISPLAY);
            return resultList;
          }
        })
      );
  }
}
