// ===============
// Angular Modules
// ===============
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// ========
// Material
// ========
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// =========
// Component
// =========
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';

// =============
// Wijmo Modules
// =============
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// ========
// Services
// ========
import { ComponentsService } from './components.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule,
    WjGridFilterModule, WjGridModule, WjInputModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule,
    WjGridFilterModule, WjGridModule, WjInputModule
  ],
  providers: [
    ComponentsService
  ],
})
export class ComponentsModule { }
