// =======
// Angular
// =======
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =====
// Wijmo
// =====
import { ObservableArray } from 'wijmo/wijmo';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

// =================
// Service and Model
// =================
import { LayoutService } from '../../layout/layout.service';

// =======
// Service
// =======
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.dialog.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityDialogComponent {
  title = 'facility';

  // ==============================
  // Facility Async Task Properties
  // ==============================
  public facilitySubscription: any;
  public cboFacilityObservableArray: ObservableArray;
  private logoutSubscription: any;

  // =====
  // Wijmo
  // =====
  @ViewChild('cboFacility') cboFacility: WjComboBox;

  // ===========
  // Constructor
  // ===========
  constructor(
    public detailFacilityDialogRef: MatDialogRef<FacilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutService: LayoutService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.title = data.objFacilityTitle;

    this.getFacilityData();
  }

  // =================
  // Get Facility Data
  // =================
  public getFacilityData(): void {
    this.layoutService.getFacilities();
    this.facilitySubscription = this.layoutService.facilitiesObservable.subscribe(
      data => {
        let facilityObservableArray = new ObservableArray();

        if (data != null) {
          for (var i = 0; i <= data.length - 1; i++) {
            facilityObservableArray.push({
              Id: data[i].Id,
              UserId: data[i].UserId,
              UserFacility: data[i].UserFacility,
              UserTypeId: data[i].UserTypeId,
              CurrentUserId: data[i].CurrentUserId
            });
          }
        }

        this.cboFacilityObservableArray = facilityObservableArray;
      }
    );
  }

  // =======================
  // Update Current Facility
  // =======================
  public btnUpdateFacilityClick(): void {
    localStorage.setItem('current_facility_id', this.cboFacility.selectedItem["UserId"]);
    localStorage.setItem('current_facility', this.cboFacility.selectedItem["UserFacility"]);
    localStorage.setItem('current_user_type_Id', this.cboFacility.selectedItem["UserTypeId"]);
    localStorage.setItem('current_user_Id', this.cboFacility.selectedItem["CurrentUserId"]);

    this.detailFacilityDialogRef.close(this.cboFacility.selectedItem["UserFacility"]);
    if (this.facilitySubscription != null) this.facilitySubscription.unsubscribe();

    setTimeout(() => {
      this.router.navigate(['/software']);
    }, 500);
  }

  // ======
  // Logout
  // ======
  public btnLogoutClick(): void {
    this.accountService.logout();
    this.logoutSubscription = this.accountService.logoutObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Logout successful.");
          setTimeout(() => {
            this.router.navigate(['/software']);
            window.location.reload();
          }, 500);
        }
      }
    );
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.facilitySubscription != null) this.facilitySubscription.unsubscribe();
  }
}