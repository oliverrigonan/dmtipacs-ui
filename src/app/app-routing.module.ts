// ===============
// Angular Modules
// ===============
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ==========
// Components
// ==========
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountLoginComponent } from './account/account.login.component';
import { AccountRegisterComponent } from './account/account.register.component';
import { LayoutComponent } from './layout/layout.component';

// ===================
// Software Components
// ===================
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalityProcedureComponent } from './modality-procedure/modality-procedure.component';
import { ModalityProcedureDetailDialogComponent } from './dialog/modality-procedure/modality-procedure-detail.dialog.component';
import { ModalityProcedureDeleteDialogComponent } from './dialog/modality-procedure/modality-procedure-delete.dialog.component';
import { BodyPartsComponent } from './body-parts/body-parts.component';
import { BodyPartsDetailDialogComponent } from './dialog/body-parts/body-parts-detail.dialog.component';
import { BodyPartsDeleteDialogComponent } from './dialog/body-parts/body-parts-delete.dialog.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail.component';
import { UserDoctorDetailDialogComponent } from './dialog/user/user-doctor-detail.dialog.component';
import { UserDoctorDeleteDialogComponent } from './dialog/user/user-doctor-delete.dialog.component';
import { RateComponent } from './rate/rate.component';
import { RateDetailDialogComponent } from './dialog/rate/rate-detail.dialog.component';
import { RateDeleteDialogComponent } from './dialog/rate/rate-delete.dialog.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { ProcedureDetailComponent } from './procedure/procedure-detail.component';
import { ProcedureDeleteDialogComponent } from './dialog/procedure/procedure-delete.dialog.component';
import { ProcedureResultDetailDialogComponent } from './dialog/procedure/procedure-result-detail.dialog.component';
import { ProcedureResultDeleteDialogComponent } from './dialog/procedure/procedure-result-delete.dialog.component';
import { ReportsComponent } from './reports/reports.component';

// ======
// Routes
// ======
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'account/login', component: AccountLoginComponent },
    { path: 'account/register', component: AccountRegisterComponent },
    {
        path: 'software', component: LayoutComponent, children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'modality/procedure', component: ModalityProcedureComponent },
            { path: 'body/parts', component: BodyPartsComponent },
            { path: 'user', component: UserComponent },
            { path: 'user/detail/:id', component: UserDetailComponent },
            { path: 'rate', component: RateComponent },
            { path: 'procedure', component: ProcedureComponent },
            { path: 'procedure/detail/:id', component: ProcedureDetailComponent },
            { path: 'reports', component: ReportsComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }