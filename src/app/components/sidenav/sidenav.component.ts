// =======
// Angular
// =======
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

// =======
// Service
// =======
import { ComponentsService } from './../components.service';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// =======
// Dialogs
// =======
import { FacilityDialogComponent } from '../../dialog/facility/facility.dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  title = 'sidenav';
  username = localStorage.getItem("username");
  currentFacilityId: number = 0;
  currentFacility: string;

  // ===========
  // Constructor
  // ===========
  constructor(
    private componentsService: ComponentsService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  // ======================
  // Launch Facility Dialog
  // ======================
  public launchFacilityDialog(): void {
    let detailFacilityDialogRef = this.dialog.open(FacilityDialogComponent, {
      width: '400px',
      data: {
        objFacilityTitle: "Choose Facility",
      }
    });

    detailFacilityDialogRef.disableClose = true;
    detailFacilityDialogRef.afterClosed().subscribe(result => {
      this.currentFacility = result;
    });
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      if (localStorage.getItem("current_facility_id") == null ||
        localStorage.getItem("current_facility") == null ||
        localStorage.getItem("current_user_type_Id") == null ||
        localStorage.getItem("current_user_Id") == null
      ) {
        setTimeout(() => {
          this.launchFacilityDialog();
        }, 100);
      } else {
        this.currentFacility = localStorage.getItem("current_facility");
      }
    }
  }
}