// ===============
// Angular Modules
// ===============
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ========
// Material
// ========
import { MatButtonModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

// =============
// Wijmo Modules
// =============
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// ===================
// Software Components
// ===================
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
import { ProcedureResultDetailDialogComponent } from '../dialog/procedure/procedure-result-detail.dialog.component';
import { ProcedureResultDeleteDialogComponent } from '../dialog/procedure/procedure-result-delete.dialog.component';
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

@NgModule({
    declarations: [
        DashboardComponent,
        ModalityProcedureComponent, ModalityProcedureDetailDialogComponent, ModalityProcedureDeleteDialogComponent,
        BodyPartsComponent, BodyPartsDetailDialogComponent, BodyPartsDeleteDialogComponent,
        UserComponent, UserDetailComponent, UserDoctorDetailDialogComponent, UserDoctorDeleteDialogComponent,
        RateComponent, RateDetailDialogComponent, RateDeleteDialogComponent,
        ProcedureComponent, ProcedureDetailComponent, ProcedureDeleteDialogComponent, ProcedureResultDetailDialogComponent, ProcedureResultDeleteDialogComponent,
        ReportsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatButtonModule, MatProgressBarModule, MatInputModule, MatDialogModule, MatTabsModule,
        WjGridFilterModule, WjGridModule, WjInputModule
    ],
    exports: [
        DashboardComponent,
        ModalityProcedureComponent, ModalityProcedureDetailDialogComponent, ModalityProcedureDeleteDialogComponent,
        BodyPartsComponent, BodyPartsDetailDialogComponent, BodyPartsDeleteDialogComponent,
        UserComponent, UserDetailComponent, UserDoctorDetailDialogComponent, UserDoctorDeleteDialogComponent,
        RateComponent, RateDetailDialogComponent, RateDeleteDialogComponent,
        ProcedureComponent, ProcedureDetailComponent, ProcedureDeleteDialogComponent, ProcedureResultDetailDialogComponent, ProcedureResultDeleteDialogComponent,
        ReportsComponent,
        MatButtonModule, MatProgressBarModule, MatInputModule, MatDialogModule, MatTabsModule,
        WjGridFilterModule, WjGridModule, WjInputModule
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
        ProcedureDeleteDialogComponent, ProcedureResultDetailDialogComponent, ProcedureResultDeleteDialogComponent
    ]
})
export class LayoutModule { }