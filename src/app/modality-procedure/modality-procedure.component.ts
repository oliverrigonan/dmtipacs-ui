// ====================
// Angular and Material
// ====================
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =======
// Dialogs
// =======
import { ModalityProcedureDetailDialogComponent } from '../dialog/modality-procedure/modality-procedure-detail.dialog.component';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { ModalityProcedureService } from './modality-procedure.service';

@Component({
  selector: 'app-modality-procedure',
  templateUrl: './modality-procedure.component.html',
  styleUrls: ['./modality-procedure.component.css', '../layout/layout.component.css']
})
export class ModalityProcedureComponent {
  // ================
  // Global Variables
  // ================
  title = 'Modality Procedure';

  // ========================================
  // Modality Procedure Async Task Properties
  // ========================================
  public modalityProcedureSubscription: any;
  public modalityProcedureData: ObservableArray = new ObservableArray();
  public modalityProcedureCollectionView: CollectionView = new CollectionView(this.modalityProcedureData);

  // ===========
  // Constructor
  // ===========
  constructor(
    public dialog: MatDialog,
    private modalityProcedureService: ModalityProcedureService
  ) { }

  // ===========================
  // Get Modality Procedure Data
  // ===========================
  public getModalityProcedureData(): void {
    let projects = new ObservableArray();

    this.modalityProcedureService.getModalityProcedure();
    this.modalityProcedureSubscription = this.modalityProcedureService.modalityProcedureObservable.subscribe(
      data => {
        if (data.length > 0) {
          this.modalityProcedureData = data;
          this.modalityProcedureCollectionView = new CollectionView(this.modalityProcedureData);
          this.modalityProcedureCollectionView.pageSize = 15;
          this.modalityProcedureCollectionView.trackChanges = true;
        }
      }
    );
  }

  // ======================
  // Add Modality Procedure
  // ======================
  public btnAddModalityProcedureClick(): void {
    let dialogRef = this.dialog.open(ModalityProcedureDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Add Modality Procedure"
      }
    });
  }

  // =======================
  // Edit Modality Procedure
  // =======================
  public btnEditModalityProcedureClick(): void {
    let dialogRef = this.dialog.open(ModalityProcedureDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Edit Modality Procedure"
      }
    });
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    this.getModalityProcedureData();
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.modalityProcedureSubscription != null) this.modalityProcedureSubscription.unsubscribe();
  }
}
