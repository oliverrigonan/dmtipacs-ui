// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { ProcedureResultModel } from '../../model/procedure-result.model';
import { ProcedureService } from '../../procedure/procedure.service';

import { ObservableArray } from 'wijmo/wijmo';

@Component({
    selector: 'app-procedure-result-detail-dialog',
    templateUrl: './procedure-result-detail.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ProcedureResultDetailDialogComponent {
    title = 'Detail Procedure Result';

    // ==========================
    // Rate Async Task Properties
    // ==========================
    public procedureResultSubscription: any;
    public doctorSubscription: any;
    public cboDoctorObservableArray: ObservableArray;
    public modalityProcedureSubscription: any;
    public cboModalityProcedureObservableArray: ObservableArray;

    // ================
    // Initialize Model
    // ================
    public procedureResultModel: ProcedureResultModel = {
        Id: 0,
        ProcedureId: 0,
        ModalityProcedureId: 0,
        ModalityProcedure: "",
        Result: "",
        DoctorId: 0,
        Doctor: "",
        DoctorDateTime: ""
    };

    // ===========
    // Constructor
    // ===========
    constructor(
        public detailProcedureResultDialogRef: MatDialogRef<ProcedureResultDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private procedureService: ProcedureService
    ) {
        this.title = data.objProcedureResultDetailDialogTitle;
        this.procedureResultModel.Id = data.objCurrentProcedureResult.Id;
        this.procedureResultModel.ProcedureId = data.objCurrentProcedureResult.ProcedureId;
        this.procedureResultModel.ModalityProcedureId = data.objCurrentProcedureResult.ModalityProcedureId;
        this.procedureResultModel.Result = data.objCurrentProcedureResult.Result;
        this.procedureResultModel.DoctorId = data.objCurrentProcedureResult.DoctorId;

        this.getModalityProcedureData(this.procedureResultModel.ModalityProcedureId);
        this.geDoctorData(this.procedureResultModel.DoctorId);
    }

    // ===========================
    // Get Modality Procedure Data
    // ===========================
    public getModalityProcedureData(modalityProcedureId: number): void {
        this.procedureService.getModalityProcedure();
        this.modalityProcedureSubscription = this.procedureService.modalityProcedureObservable.subscribe(
            data => {
                let modalityProcedureObservableArray = new ObservableArray();

                if (data.length > 0) {
                    for (var i = 0; i <= data.length - 1; i++) {
                        modalityProcedureObservableArray.push({
                            Id: data[i].Id,
                            ModalityProcedure: data[i].ModalityProcedure,
                        });
                    }
                }

                this.cboModalityProcedureObservableArray = modalityProcedureObservableArray;

                setTimeout(() => {
                    this.procedureResultModel.ModalityProcedureId = modalityProcedureId;
                }, 1000);
            }
        );
    }

    // ===============
    // Get Doctor Data
    // ===============
    public geDoctorData(doctorId: number): void {
        this.procedureService.getDoctor();
        this.doctorSubscription = this.procedureService.doctorObservable.subscribe(
            data => {
                let doctorObservableArray = new ObservableArray();

                if (data.length > 0) {
                    for (var i = 0; i <= data.length - 1; i++) {
                        doctorObservableArray.push({
                            Id: data[i].Id,
                            FullName: data[i].FullName,
                        });
                    }
                }

                this.cboDoctorObservableArray = doctorObservableArray;

                setTimeout(() => {
                    this.procedureResultModel.DoctorId = doctorId;
                }, 1000);
            }
        );
    }

    // =====================
    // Save Procedure Result
    // =====================
    public btnSaveProcedureResultClick(): void {
        let btnSaveProcedureResult: Element = document.getElementById("btnSaveProcedureResult");
        btnSaveProcedureResult.setAttribute("disabled", "disabled");
        btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Saving...";

        let btnCloseProcedureResult: Element = document.getElementById("btnCloseProcedureResult");
        btnCloseProcedureResult.setAttribute("disabled", "disabled");

        this.procedureService.saveProcedureResult(this.procedureResultModel);
        this.procedureResultSubscription = this.procedureService.procedureResultSavedObservable.subscribe(
            data => {
                if (data == 200) {
                    this.detailProcedureResultDialogRef.close(200);
                    btnSaveProcedureResult.removeAttribute("disabled");
                    btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseProcedureResult.removeAttribute("disabled");
                } else if (data == 404) {
                    this.detailProcedureResultDialogRef.close(404);
                    btnSaveProcedureResult.removeAttribute("disabled");
                    btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseProcedureResult.removeAttribute("disabled");
                } else if (data == 400) {
                    this.detailProcedureResultDialogRef.close(400);
                    btnSaveProcedureResult.removeAttribute("disabled");
                    btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseProcedureResult.removeAttribute("disabled");
                } else if (data == 500) {
                    this.detailProcedureResultDialogRef.close(500);
                    btnSaveProcedureResult.removeAttribute("disabled");
                    btnSaveProcedureResult.innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    btnCloseProcedureResult.removeAttribute("disabled");
                }
            }
        );
    }

    // =============================
    // Close Procedure Result Dialog
    // =============================
    public btnCloseProcedureResultClick(): void {
        this.detailProcedureResultDialogRef.close();

        if (this.procedureResultSubscription != null) this.procedureResultSubscription.unsubscribe();
        // if (this.modalityProcedureSubscription != null) this.modalityProcedureSubscription.unsubscribe();
    }
}