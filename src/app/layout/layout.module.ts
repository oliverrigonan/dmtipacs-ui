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

// ==============
// Custom Modules
// ==============
import { ComponentsModule } from '../components/components.module';

// ======
// Routes
// ======
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent
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
