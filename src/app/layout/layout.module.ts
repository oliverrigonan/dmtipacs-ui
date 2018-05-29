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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

// =============
// Wijmo Modules
// =============
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// ==========
// Components
// ==========
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ModalityProcedureComponent } from '../modality-procedure/modality-procedure.component';
import { ModalityProcedureDetailDialogComponent } from '../dialog/modality-procedure/modality-procedure-detail.dialog.component';
import { ModalityProcedureDeleteDialogComponent } from '../dialog/modality-procedure/modality-procedure-delete.dialog.component';
import { BodyPartsComponent } from '../body-parts/body-parts.component';
import { BodyPartsDetailDialogComponent } from '../dialog/body-parts/body-parts-detail.dialog.component';
import { BodyPartsDeleteDialogComponent } from '../dialog/body-parts/body-parts-delete.dialog.component';
import { UserComponent } from '../user/user.component';
import { UserDetailComponent } from '../user/user-detail.component';
import { UserDoctorDetailDialogComponent } from '../dialog/user/user-doctor-detail.dialog.component';
import { UserDoctorDeleteDialogComponent } from '../dialog/user/user-doctor-delete.dialog.component';
import { RateComponent } from '../rate/rate.component';
import { RateDetailDialogComponent } from '../dialog/rate/rate-detail.dialog.component';
import { RateDeleteDialogComponent } from '../dialog/rate/rate-delete.dialog.component';
import { ProcedureComponent } from '../procedure/procedure.component';
import { ProcedureDetailComponent } from '../procedure/procedure-detail.component';
import { ProcedureDeleteDialogComponent } from '../dialog/procedure/procedure-delete.dialog.component';
import { ReportsComponent } from '../reports/reports.component';

// ========
// Services
// ========
import { ModalityProcedureService } from '../modality-procedure/modality-procedure.service'
import { BodyPartsService } from '../body-parts/body-parts.service'
import { RateService } from '../rate/rate.service'
import { UserService } from '../user/user.service'
import { ReportService } from '../reports/reports.service'
import { ProcedureService } from '../procedure/procedure.service'

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
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: 'rate', component: RateComponent },
  { path: 'procedure', component: ProcedureComponent },
  { path: 'procedure/detail/:id', component: ProcedureDetailComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ModalityProcedureComponent, ModalityProcedureDetailDialogComponent, ModalityProcedureDeleteDialogComponent,
    BodyPartsComponent, BodyPartsDetailDialogComponent, BodyPartsDeleteDialogComponent,
    UserComponent, UserDetailComponent, UserDoctorDetailDialogComponent, UserDoctorDeleteDialogComponent,
    RateComponent, RateDetailDialogComponent, RateDeleteDialogComponent,
    ProcedureComponent, ProcedureDetailComponent, ProcedureDeleteDialogComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgbModule.forRoot(),
    HttpModule,
    FormsModule,
    MatCardModule, MatInputModule, MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule, MatTabsModule, MatGridListModule,
    WjGridFilterModule,
    WjGridModule, WjInputModule
  ],
  exports: [
    RouterModule,
    ComponentsModule,
    MatCardModule, MatInputModule, MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule, MatTabsModule,
    WjGridFilterModule,
    WjGridModule, WjInputModule
  ],
  providers: [
    ModalityProcedureService,
    BodyPartsService,
    RateService,
    UserService,
    ReportService,
    ProcedureService
  ],
  entryComponents: [
    ModalityProcedureDetailDialogComponent, ModalityProcedureDeleteDialogComponent,
    BodyPartsDetailDialogComponent, BodyPartsDeleteDialogComponent,
    RateDetailDialogComponent, RateDeleteDialogComponent,
    UserDoctorDetailDialogComponent, UserDoctorDeleteDialogComponent,
    ProcedureDeleteDialogComponent
  ]
})
export class LayoutModule { }