// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { ModalityProcedureModel } from '../../model/modality-procedure.model';
import { ModalityProcedureService } from '../../modality-procedure/modality-procedure.service';

import { ObservableArray } from 'wijmo/wijmo';

@Component({
  selector: 'app-home',
  templateUrl: './modality-procedure-detail.dialog.component.html',
  styleUrls: ['../dialog.css']
})
export class ModalityProcedureDetailDialogComponent {
  // ================
  // Global Variables
  // ================
  title = 'modality procedure detail dialog';

  // ========================================
  // Modality Procedure Async Task Properties
  // ========================================
  public modalityProcedureSubscription: any;
  public modalitySubscription: any;
  public cboModalityObservableArray: ObservableArray;

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
    public dialogRef: MatDialogRef<ModalityProcedureDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalityProcedureService: ModalityProcedureService
  ) {
    this.title = data.objModalityDetailProcedureDialogTitle;
    this.modalityProcedureModel.Id = data.objCurrentModalityProcedure.Id;
    this.modalityProcedureModel.ModalityId = data.objCurrentModalityProcedure.ModalityId;
    this.modalityProcedureModel.Modality = data.objCurrentModalityProcedure.Modality;
    this.modalityProcedureModel.ModalityProcedure = data.objCurrentModalityProcedure.ModalityProcedure;
    this.modalityProcedureModel.ModalityResultTemplate = data.objCurrentModalityProcedure.ModalityResultTemplate;
    this.modalityProcedureModel.DoctorId = data.objCurrentModalityProcedure.DoctorId;

    this.getModalityData(this.modalityProcedureModel.ModalityId);
  }

  // =================
  // Get Modality Data
  // =================
  public getModalityData(modalityId: number): void {
    this.modalityProcedureService.getModality();
    this.modalitySubscription = this.modalityProcedureService.modalityObservable.subscribe(
      data => {
        let modalityObservableArray = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            modalityObservableArray.push({
              Id: data[i].Id,
              Modality: data[i].Modality,
            });
          }
        }

        this.cboModalityObservableArray = modalityObservableArray;
        setTimeout(() => {
          this.modalityProcedureModel.ModalityId = modalityId;
        }, 50);
      }
    );
  }

  // =======================
  // Save Modality Procedure
  // =======================
  public btnSaveModalityProcedureClick(): void {
    this.modalityProcedureService.saveModalityProcedure(this.modalityProcedureModel);
    this.modalityProcedureSubscription = this.modalityProcedureService.modalityProcedureSavedObservable.subscribe(
      data => {
        if (data == 200) {

        } else if (data == 404) {

        } else if (data == 400) {

        } else if (data == 500) {

        }
      }
    );
  }

  // ===============================
  // Close Modality Procedure Dialog
  // ===============================
  btnCloseModalityProcedureClick(): void {
    this.dialogRef.close();
  }
}
