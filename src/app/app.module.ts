// ===============
// Angular Modules
// ===============
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// ==============
// Custom Modules
// ==============
import { ComponentsModule } from './components/components.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// =============
// Wijmo Modules
// =============
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

// ==========
// Components
// ==========
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountLoginComponent } from './account/account.login.component';
import { AccountRegisterComponent } from './account/account.register.component';
import { LayoutComponent } from './layout/layout.component';

// ========
// Services
// ========
import { AccountService } from './account/account.service';

// ======
// Routes
// ======
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account/login', component: AccountLoginComponent },
  { path: 'account/register', component: AccountRegisterComponent },
  { path: '', component: LayoutComponent, children: [{ path: '', loadChildren: './layout/layout.module#LayoutModule' }] },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountLoginComponent,
    AccountRegisterComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ComponentsModule,
    NgbModule.forRoot(),
    WjGridModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AccountService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
