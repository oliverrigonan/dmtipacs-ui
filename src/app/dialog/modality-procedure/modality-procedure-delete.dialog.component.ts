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

@Component({
    selector: 'app-modality-procedure-delete-dialog',
    templateUrl: './modality-procedure-delete.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ModalityProcedureDeleteDialogComponent {
    // ================
    // Global Variables
    // ================
    title = 'modality procedure delete dialog';

    // ========================================
    // Modality Procedure Async Task Properties
    // ========================================
    public modalityProcedureSubscription: any;

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
        public dialogRef: MatDialogRef<ModalityProcedureDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private modalityProcedureService: ModalityProcedureService
    ) {
        this.title = data.objModalityDetailProcedureDialogTitle;
        this.modalityProcedureModel.Id = data.objCurrentModalityProcedure.Id;
    }

    // =================================
    // Confirm Delete Modality Procedure
    // =================================
    public btnConfirmDeleteModalityProcedureClick(): void {
        this.modalityProcedureService.deleteModalityProcedure(this.modalityProcedureModel.Id);
        this.modalityProcedureSubscription = this.modalityProcedureService.modalityProcedureDeletedObservable.subscribe(
            data => {
                if (data == 200) {

                } else if (data == 404) {

                } else if (data == 400) {

                } else if (data == 500) {

                }
            }
        );
    }
}
