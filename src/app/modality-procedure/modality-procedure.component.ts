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

// =====
// Model
// =====
import { ModalityProcedureModel } from '../model/modality-procedure.model';

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
  isProgressBarHidden = false;

  // ========================================
  // Modality Procedure Async Task Properties
  // ========================================
  public modalityProcedureSubscription: any;
  public modalityProcedureData: ObservableArray = new ObservableArray();
  public modalityProcedureCollectionView: CollectionView = new CollectionView(this.modalityProcedureData);

  // ================
  // Initialize Model
  // ================
  public modalityProcedureModel: ModalityProcedureModel = {
    Id: 0,
    ModalityId: 0,
    Modality: "",
    ModalityProcedure: "",
    ModalityResultTemplate: "",
    DoctorId: null
  };

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
        if (data != null) {
          this.isProgressBarHidden = true;
          if (data.length > 0) {
            this.modalityProcedureData = data;
            this.modalityProcedureCollectionView = new CollectionView(this.modalityProcedureData);
            this.modalityProcedureCollectionView.pageSize = 15;
            this.modalityProcedureCollectionView.trackChanges = true;
          }
        } else {
          this.isProgressBarHidden = true;
        }
      }
    );
  }

  // ======================
  // Add Modality Procedure
  // ======================
  public btnAddModalityProcedureClick(): void {
    this.modalityProcedureModel.Id = 0;
    this.modalityProcedureModel.ModalityId = 0;
    this.modalityProcedureModel.Modality = "";
    this.modalityProcedureModel.ModalityProcedure = "";
    this.modalityProcedureModel.ModalityResultTemplate = "";
    this.modalityProcedureModel.DoctorId = null;

    let dialogRef = this.dialog.open(ModalityProcedureDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Add Modality Procedure",
        objCurrentModalityProcedure: this.modalityProcedureModel
      }
    });
  }

  // =======================
  // Edit Modality Procedure
  // =======================
  public btnEditModalityProcedureClick(): void {
    let currentModalityProcedure = this.modalityProcedureCollectionView.currentItem;
    this.modalityProcedureModel.Id = currentModalityProcedure.Id;
    this.modalityProcedureModel.ModalityId = currentModalityProcedure.ModalityId;
    this.modalityProcedureModel.Modality = currentModalityProcedure.Modality;
    this.modalityProcedureModel.ModalityProcedure = currentModalityProcedure.ModalityProcedure;
    this.modalityProcedureModel.ModalityResultTemplate = currentModalityProcedure.ModalityResultTemplate;
    this.modalityProcedureModel.DoctorId = currentModalityProcedure.DoctorId;

    let dialogRef = this.dialog.open(ModalityProcedureDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Edit Modality Procedure",
        objCurrentModalityProcedure: this.modalityProcedureModel
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
