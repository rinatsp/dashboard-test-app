import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardApiService } from "./services/api/dashboard-api.service";
import { DataControllerService } from "./services/data-controller.service";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { DataTableComponent } from "./data-table/data-table.component";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardApiService,
    DataControllerService
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToolBarComponent,
    DataTableComponent
  ]
})
export class DashboardModule { }
