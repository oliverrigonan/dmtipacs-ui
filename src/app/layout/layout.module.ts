// ===============
// Angular Modules
// ===============
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// ========
// Material
// ========
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// =============
// Wijmo Modules
// =============
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

// ==========
// Components
// ==========
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ModalityProcedureComponent } from '../modality-procedure/modality-procedure.component';
import { ModalityProcedureDetailDialogComponent } from '../dialog/modality-procedure/modality-procedure-detail.dialog.component';
import { BodyPartsComponent } from '../body-parts/body-parts.component';
import { UserComponent } from '../user/user.component';
import { RateComponent } from '../rate/rate.component';
import { ProcedureComponent } from '../procedure/procedure.component';
import { ReportsComponent } from '../reports/reports.component';

// ========
// Services
// ========
import { ModalityProcedureService } from '../modality-procedure/modality-procedure.service'

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
    ModalityProcedureComponent, ModalityProcedureDetailDialogComponent,
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
    NgbModule.forRoot(),
    HttpModule,
    FormsModule,
    MatCardModule, MatInputModule, MatDialogModule, MatProgressBarModule,
    WjGridFilterModule,
    WjGridModule
  ],
  exports: [
    RouterModule,
    ComponentsModule,
    MatCardModule, MatInputModule, MatDialogModule, MatProgressBarModule,
    WjGridFilterModule,
    WjGridModule
  ],
  providers: [
    ModalityProcedureService
  ],
  entryComponents: [
    ModalityProcedureDetailDialogComponent
  ]
})
export class LayoutModule { }
