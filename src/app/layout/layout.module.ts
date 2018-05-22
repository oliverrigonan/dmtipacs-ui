// ===============
// Angular Modules
// ===============
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ==========
// Components
// ==========
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ModalityProcedureComponent } from '../modality-procedure/modality-procedure.component';
import { BodyPartsComponent } from '../body-parts/body-parts.component';
import { UserComponent } from '../user/user.component';
import { RateComponent } from '../rate/rate.component';
import { ProcedureComponent } from '../procedure/procedure.component';
import { ReportsComponent } from '../reports/reports.component';

// ==============
// Custom Modules
// ==============
import { ComponentsModule } from '../components/components.module';

// ======
// Routes
// ======
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'modality/procedure', component: ModalityProcedureComponent },
  { path: 'body/parts', component: BodyPartsComponent },
  { path: 'user', component: UserComponent },
  { path: 'rate', component: RateComponent },
  { path: 'procedure', component: ProcedureComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ModalityProcedureComponent,
    BodyPartsComponent,
    UserComponent,
    RateComponent,
    ProcedureComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgbModule.forRoot()
  ],
  exports: [
    RouterModule,
    ComponentsModule
  ]
})
export class LayoutModule { }
