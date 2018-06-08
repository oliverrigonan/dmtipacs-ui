// ====================
// Angular and Material
// ====================
import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';

// =================================
// Async Task and Wijmo and Services
// =================================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { ReportService } from './reports.service';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  // ================
  // Global Variables
  // ================
  title = 'reports';
  isProcedureSummaryReportProgressBarHidden = false;
  isProcedureDetailReportProgressBarHidden = false;

  // =====
  // Wijmo
  // =====
  @ViewChild('procedureSummaryReportFlexGrid') procedureSummaryReportFlexGrid: WjFlexGrid;
  @ViewChild('procedureDetailReportFlexGrid') procedureDetailReportFlexGrid: WjFlexGrid;

  // ==============================================
  // Procedure Summary Report Async Task Properties
  // ==============================================
  public procedureSummaryReportSubscription: any;
  public procedureSummaryReportData: ObservableArray = new ObservableArray();
  public procedureSummaryReportCollectionView: CollectionView = new CollectionView(this.procedureSummaryReportData);

  // =============================================
  // Procedure Detail Report Async Task Properties
  // =============================================
  public procedureDetailReportSubscription: any;
  public procedureDetailReportData: ObservableArray = new ObservableArray();
  public procedureDetailReportCollectionView: CollectionView = new CollectionView(this.procedureSummaryReportData);

  // ===========================
  // Date Range Filters (Values)
  // ===========================
  public procedureSummaryReportStartDateData = new Date();
  public procedureSummaryReportEndDateData = new Date();
  public procedureDetailReportStartDateData = new Date();
  public procedureDetailReportEndDateData = new Date();
  public isProcedureSummaryReportStartDateClicked: Boolean = false;
  public isProcedureSummaryReportStartDateSelected: Boolean = false;
  public isProcedureSummaryReportEndDateClicked: Boolean = false;
  public isProcedureSummaryReportEndDateSelected: Boolean = false;
  public isProcedureDetailReportStartDateClicked: Boolean = false;
  public isProcedureDetailReportStartDateSelected: Boolean = false;
  public isProcedureDetailReportEndDateClicked: Boolean = false;
  public isProcedureDetailReportEndDateSelected: Boolean = false;
  public cboProcedureSummaryReportShowNumberOfRows: ObservableArray = new ObservableArray();
  public cboProcedureDetailReportShowNumberOfRows: ObservableArray = new ObservableArray();
  public procedureSummaryReportNumberOfPageIndex: number;
  public procedureDetailReportNumberOfPageIndex: number;

  public isBtnRefreshProcedureSummaryReportDataDisabled: Boolean = true;
  public isBtnRefreshProcedureDetailReportDataDisabled: Boolean = true;

  // ===========
  // Constructor
  // ===========
  constructor(
    private reportService: ReportService,
    private router: Router,
    private toastr: ToastrService
  ) { }


  // =================================================
  // Text Change : Start Date Procedure Summary Report
  // =================================================
  public procedureSummaryReportStartDateTextChanged() {
    if (this.isProcedureSummaryReportStartDateClicked == true) {
      if (this.isProcedureSummaryReportStartDateSelected == true) {
        this.getProcedureSummaryReportData();
      } else {
        this.isProcedureSummaryReportStartDateSelected = true;
      }
    } else {
      this.isProcedureSummaryReportStartDateClicked = true;
    }
  }

  // ===============================================
  // Text Change : End Date Procedure Summary Report
  // ===============================================
  public procedureSummaryReportEndDateTextChanged() {
    if (this.isProcedureSummaryReportEndDateClicked == true) {
      if (this.isProcedureSummaryReportEndDateSelected == true) {
        this.getProcedureSummaryReportData();
      } else {
        this.isProcedureSummaryReportEndDateClicked = true;
      }
    } else {
      this.isProcedureSummaryReportEndDateSelected = true;
    }
  }

  // ================================================
  // Text Change : Start Date Procedure Detail Report
  // ================================================
  public procedureDetailReportStartDateTextChanged() {
    if (this.isProcedureDetailReportStartDateClicked == true) {
      if (this.isProcedureDetailReportStartDateSelected == true) {
        this.getProcedureDetailReportData();
      } else {
        this.isProcedureDetailReportStartDateSelected = true;
      }
    } else {
      this.isProcedureDetailReportStartDateClicked = true;
    }
  }

  // ==============================================
  // Text Change : End Date Procedure Detail Report
  // ==============================================
  public procedureDetailReportEndDateTextChanged() {
    if (this.isProcedureDetailReportEndDateClicked == true) {
      if (this.isProcedureDetailReportEndDateSelected == true) {
        this.getProcedureDetailReportData();
      } else {
        this.isProcedureDetailReportEndDateClicked = true;
      }
    } else {
      this.isProcedureDetailReportEndDateSelected = true;
    }
  }

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

      this.cboProcedureSummaryReportShowNumberOfRows.push({
        rowNumber: rows,
        rowString: rowsString
      });

      this.cboProcedureDetailReportShowNumberOfRows.push({
        rowNumber: rows,
        rowString: rowsString
      });
    }
  }

  // =================================
  // Get Procedure Summary Report Data
  // =================================
  public getProcedureSummaryReportData(): void {
    if (this.procedureSummaryReportSubscription != null) this.procedureSummaryReportSubscription.unsubscribe();

    this.isBtnRefreshProcedureSummaryReportDataDisabled = true;
    this.isProcedureSummaryReportProgressBarHidden = false;

    let dateStart = [this.procedureSummaryReportStartDateData.getFullYear(), this.procedureSummaryReportStartDateData.getMonth() + 1, this.procedureSummaryReportStartDateData.getDate()].join('-');
    let dateEnd = [this.procedureSummaryReportEndDateData.getFullYear(), this.procedureSummaryReportEndDateData.getMonth() + 1, this.procedureSummaryReportEndDateData.getDate()].join('-');

    this.reportService.getProcedureSummaryReport(dateStart, dateEnd);
    this.procedureSummaryReportSubscription = this.reportService.procedureSummaryReportObservable.subscribe(
      data => {
        if (data != null) {
          this.isProcedureSummaryReportProgressBarHidden = true;
          if (data.length > 0) {
            this.procedureSummaryReportData = data;
            this.procedureSummaryReportCollectionView = new CollectionView(this.procedureSummaryReportData);
            this.procedureSummaryReportCollectionView.pageSize = this.procedureSummaryReportNumberOfPageIndex;
            this.procedureSummaryReportCollectionView.trackChanges = true;
          }
        } else {
          this.isProcedureSummaryReportProgressBarHidden = true;
        }

        this.isBtnRefreshProcedureSummaryReportDataDisabled = false;
      }
    );
  }

  // =============================================================================
  // Combo Show Number of Rows On Selected Index Changed: Procedure Summary Report
  // =============================================================================
  public cboProcedureSummaryReportShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.procedureSummaryReportNumberOfPageIndex = selectedValue;

    this.procedureSummaryReportCollectionView.pageSize = this.procedureSummaryReportNumberOfPageIndex;
    this.procedureSummaryReportCollectionView.refresh();
    this.procedureSummaryReportFlexGrid.refresh();
  }

  // ================================
  // Get Procedure Detail Report Data
  // ================================
  public getProcedureDetailReportData(): void {
    if (this.procedureDetailReportSubscription != null) this.procedureDetailReportSubscription.unsubscribe();

    this.isBtnRefreshProcedureDetailReportDataDisabled = true;
    this.isProcedureDetailReportProgressBarHidden = false;

    let dateStart = [this.procedureDetailReportStartDateData.getFullYear(), this.procedureDetailReportStartDateData.getMonth() + 1, this.procedureDetailReportStartDateData.getDate()].join('-');
    let dateEnd = [this.procedureDetailReportEndDateData.getFullYear(), this.procedureDetailReportEndDateData.getMonth() + 1, this.procedureDetailReportEndDateData.getDate()].join('-');

    this.reportService.getProcedureDetailReport(dateStart, dateEnd);
    this.procedureDetailReportSubscription = this.reportService.procedureDetailReportObservable.subscribe(
      data => {
        if (data != null) {
          this.isProcedureDetailReportProgressBarHidden = true;
          if (data.length > 0) {
            this.procedureDetailReportData = data;
            this.procedureDetailReportCollectionView = new CollectionView(this.procedureDetailReportData);
            this.procedureDetailReportCollectionView.pageSize = this.procedureDetailReportNumberOfPageIndex;
            this.procedureDetailReportCollectionView.trackChanges = true;
          }
        } else {
          this.isProcedureDetailReportProgressBarHidden = true;
        }

        this.isBtnRefreshProcedureDetailReportDataDisabled = false;
      }
    );
  }

  // ============================================================================
  // Combo Show Number of Rows On Selected Index Changed: Procedure Detail Report
  // ============================================================================
  public cboProcedureDetailReportShowNumberOfRowsOnSelectedIndexChanged(selectedValue: any): void {
    this.procedureDetailReportNumberOfPageIndex = selectedValue;

    this.procedureDetailReportCollectionView.pageSize = this.procedureDetailReportNumberOfPageIndex;
    this.procedureDetailReportCollectionView.refresh();
    this.procedureDetailReportFlexGrid.refresh();
  }

  // ============
  // On Click Tabs
  // =============
  public onTabClick(event: MatTabChangeEvent) {
    if (event.index == 0) {
      setTimeout(() => {
        this.procedureSummaryReportCollectionView.refresh();
        this.procedureSummaryReportFlexGrid.refresh();
      }, 500);
    } else if (event.index == 1) {
      setTimeout(() => {
        this.procedureDetailReportCollectionView.refresh();
        this.procedureDetailReportFlexGrid.refresh();
      }, 500);
    }
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    this.createCboShowNumberOfRows();
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      setTimeout(() => {
        this.getProcedureSummaryReportData();
        this.getProcedureDetailReportData();
      }, 500);
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.procedureSummaryReportSubscription != null) this.procedureSummaryReportSubscription.unsubscribe();
    if (this.procedureDetailReportSubscription != null) this.procedureDetailReportSubscription.unsubscribe();
  }
}