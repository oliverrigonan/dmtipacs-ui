// ====================
// Angular and Material
// ====================
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

// =======
// Dialogs
// =======
import { ProcedureDeleteDialogComponent } from '../dialog/procedure/procedure-delete.dialog.component';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { ProcedureService } from './procedure.service';

// =====
// Model
// =====
import { ProcedureModel } from '../model/procedure.model';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css', '../layout/layout.component.css']
})
export class ProcedureComponent {
  // ================
  // Global Variables
  // ================
  title = 'procedure';
  isProgressBarHidden = false;

  // ===============================
  // Procedure Async Task Properties
  // ===============================
  public procedureSubscription: any;
  public procedureData: ObservableArray = new ObservableArray();
  public procedureCollectionView: CollectionView = new CollectionView(this.procedureData);

  // ===========================
  // Date Range Filters (Values)
  // ===========================
  public procedureStartDateData = new Date();
  public procedureEndDateData = new Date();
  public cboProcedureShowNumberOfRows: ObservableArray = new ObservableArray();
  public procedureNumberOfPageIndex: number;

  public isStartDateClicked: Boolean = false;
  public isStartDateSelected: Boolean = false;
  public isEndDateClicked: Boolean = false;
  public isEndDateSelected: Boolean = false;

  // =====
  // Wijmo
  // =====
  @ViewChild('procedureFlexGrid') procedureFlexGrid: WjFlexGrid;

  // ================
  // Initialize Model
  // ================
  public procedureModel: ProcedureModel = {
    Id: 0,
    TransactionNumber: "",
    TransactionDateTime: "",
    TransactionTime: "",
    DICOMFileName: "",
    PatientName: "",
    Gender: "",
    DateOfBirth: "",
    Age: 0,
    Particulars: "",
    ModalityId: 0,
    Modality: "",
    BodyPartId: 0,
    BodyPart: "",
    UserId: 0,
    User: "",
    PatientAddress: "",
    ReferringPhysician: "",
    StudyDate: "",
    HospitalNumber: "",
    HospitalWardNumber: "",
    StudyInstanceId: ""
  };

  // ===========
  // Constructor
  // ===========
  constructor(
    public dialog: MatDialog,
    private procedureService: ProcedureService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  // ================================
  // Create Combo Show Number of Rows
  // ================================
  public createCboShowNumberOfRows(): void {
    for (var i = 0; i <= 4; i++) {
      var rows = 0;
      var rowsString = "";

      if (i == 0) {
        rows = 15;
        rowsString = "Show 15 Rows";
      } else if (i == 1) {
        rows = 50;
        rowsString = "Show 50 Rows";
      } else if (i == 2) {
        rows = 100;
        rowsString = "Show 100 Rows";
      } else if (i == 3) {
        rows = 150;
        rowsString = "Show 150 Rows";
      } else {
        rows = 200;
        rowsString = "Show 200 Rows";
      }

      this.cboProcedureShowNumberOfRows.push({
        rowNumber: rows,
        rowString: rowsString
      });
    }
  }

  // ===================================================
  // Combo Show Number of Rows On Selected Index Changed
  // ===================================================
  public cboShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.procedureNumberOfPageIndex = selectedValue;

    this.procedureCollectionView.pageSize = this.procedureNumberOfPageIndex;
    this.procedureCollectionView.refresh();
    this.procedureFlexGrid.refresh();
  }

  // ========================
  // Text Change : Start Date
  // ========================
  public startDateTextChanged() {
    if (this.isStartDateClicked == true) {
      if (this.isStartDateSelected == true) {
        this.getProcedureData();
      } else {
        this.isStartDateSelected = true;
      }
    } else {
      this.isStartDateClicked = true;
    }
  }

  // ======================
  // Text Change : End Date
  // ======================
  public endDateTextChanged() {
    if (this.isEndDateClicked == true) {
      if (this.isEndDateSelected == true) {
        this.getProcedureData();
      } else {
        this.isEndDateSelected = true;
      }
    } else {
      this.isEndDateClicked = true;
    }
  }

  // ==================
  // Get Procedure Data
  // ==================
  public getProcedureData(): void {
    let refreshProcedureData: Element = document.getElementById("refreshProcedureData");
    refreshProcedureData.setAttribute("disabled", "disabled");
    refreshProcedureData.innerHTML = "<i class='fa fa-refresh'></i>";

    this.isProgressBarHidden = false;

    let dateStart = [this.procedureStartDateData.getFullYear(), this.procedureStartDateData.getMonth() + 1, this.procedureStartDateData.getDate()].join('-');
    let dateEnd = [this.procedureEndDateData.getFullYear(), this.procedureEndDateData.getMonth() + 1, this.procedureEndDateData.getDate()].join('-');

    this.procedureService.getProcedure(dateStart, dateEnd);
    this.procedureSubscription = this.procedureService.procedureObservable.subscribe(
      data => {
        if (data != null) {
          this.isProgressBarHidden = true;
          if (data.length > 0) {
            this.procedureData = data;
            this.procedureCollectionView = new CollectionView(this.procedureData);
            this.procedureCollectionView.pageSize = this.procedureNumberOfPageIndex;
            this.procedureCollectionView.trackChanges = true;
          }
        } else {
          this.isProgressBarHidden = true;
        }

        refreshProcedureData.removeAttribute("disabled");
        refreshProcedureData.innerHTML = "<i class='fa fa-refresh'></i>";
      }
    );
  }

  // ==============
  // Edit Procedure
  // ==============
  public btnEditProcedureClick(): void {
    let currentProcedure = this.procedureCollectionView.currentItem;
    this.router.navigate(['/software/procedure/detail', currentProcedure.Id]);
  }

  // ================
  // Delete Procedure
  // ================
  public btnDeleteProcedureClick(): void {
    let currentProcedure = this.procedureCollectionView.currentItem;
    this.procedureModel.Id = currentProcedure.Id;

    let deleteProcedureDialogRef = this.dialog.open(ProcedureDeleteDialogComponent, {
      width: '400px',
      data: {
        objProcedureDeleteDialogTitle: "Delete Procedure",
        objCurrentProcedure: this.procedureModel
      }
    });

    deleteProcedureDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Delete Successful!');
        this.getProcedureData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    this.createCboShowNumberOfRows();
    this.getProcedureData();
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.procedureSubscription != null) this.procedureSubscription.unsubscribe();
  }
}