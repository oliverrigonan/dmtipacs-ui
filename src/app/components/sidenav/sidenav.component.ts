// =======
// Angular
// =======
import { Component } from '@angular/core';

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

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  title = 'sidenav';
  username = localStorage.getItem("username");

  // ========================================
  // Modality Procedure Async Task Properties
  // ========================================
  public facilitySubscription: any;
  public cboFacilityObservableArray: ObservableArray;

  // ===========
  // Constructor
  // ===========
  constructor(
    private componentsService: ComponentsService,
    private toastr: ToastrService
  ) { }

  // =================
  // Get Facility Data
  // =================
  public getFacilityData(): void {
    this.componentsService.getFacilities();
    this.facilitySubscription = this.componentsService.facilitiesObservable.subscribe(
      data => {
        let facilityObservableArray = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            facilityObservableArray.push({
              Id: data[i].Id,
              UserId: data[i].UserId,
              UserFacility: data[i].UserFacility
            });
          }
        }

        this.cboFacilityObservableArray = facilityObservableArray;
      }
    );
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    this.getFacilityData();
  }
}
