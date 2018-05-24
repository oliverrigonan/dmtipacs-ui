// ====================
// Angular and Material
// ====================
import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

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

  // ===========
  // Constructor
  // ===========
  constructor(
    private reportService: ReportService,
    private toastr: ToastrService
  ) { }

  // =================================
  // Get Procedure Summary Report Data
  // =================================
  public getProcedureSummaryReportData(): void {
    if (this.procedureSummaryReportSubscription != null) this.procedureSummaryReportSubscription.unsubscribe();
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
            this.procedureSummaryReportCollectionView.pageSize = 15;
            this.procedureSummaryReportCollectionView.trackChanges = true;
          }
        } else {
          this.isProcedureSummaryReportProgressBarHidden = true;
        }
      }
    );
  }

  // ================================
  // Get Procedure Detail Report Data
  // ================================
  public getProcedureDetailReportData(): void {
    if (this.procedureDetailReportSubscription != null) this.procedureDetailReportSubscription.unsubscribe();
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
            this.procedureDetailReportCollectionView.pageSize = 15;
            this.procedureDetailReportCollectionView.trackChanges = true;
          }
        } else {
          this.isProcedureDetailReportProgressBarHidden = true;
        }
      }
    );
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
    this.getProcedureSummaryReportData();
    this.getProcedureDetailReportData();
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.procedureSummaryReportSubscription != null) this.procedureSummaryReportSubscription.unsubscribe();
    if (this.procedureDetailReportSubscription != null) this.procedureDetailReportSubscription.unsubscribe();
  }
}
