// ====================
// Angular and Material
// ====================
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =======
// Service
// =======
import { ProcedureService } from './procedure.service';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// =====
// Model
// =====
import { ProcedureModel } from '../model/procedure.model';
import { ProcedureResultModel } from '../model/procedure-result.model';

// =======
// Dialogs
// =======
import { ProcedureResultDetailDialogComponent } from '../dialog/procedure/procedure-result-detail.dialog.component';
import { ProcedureResultDeleteDialogComponent } from '../dialog/procedure/procedure-result-delete.dialog.component';

@Component({
    selector: 'app-procedure-detail',
    templateUrl: './procedure-detail.component.html',
    styleUrls: ['./procedure.component.css', '../layout/layout.component.css']
})
export class ProcedureDetailComponent {
    title = 'procedure detail';
    isProcedureResultProgressBarHidden = false;

    // ==========================
    // User Async Task Properties
    // ==========================
    public procedureSubscription: any;

    // =================================
    // Procedure Result Async Task Properties
    // =================================
    public procedureResultSubscription: any;
    public procedureResultData: ObservableArray = new ObservableArray();
    public procedureResultCollectionView: CollectionView = new CollectionView(this.procedureResultData);

    // ===========
    // Constructor
    // ===========
    constructor(
        public dialog: MatDialog,
        private procedureService: ProcedureService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute
    ) { }

    // =======================
    // Get Parameter Id Method
    // =======================
    private getId(): number {
        let id = 0;
        this.activatedRoute.params.subscribe(params => {
            id = params["id"];
        });
        return id;
    }

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

    // =========================
    // Get Procedure Detail Data
    // =========================
    public getProcedureDetailData() {
        this.procedureService.getProcedureDetail(this.getId());

        this.procedureSubscription = this.procedureService.procedureDetailObservable
            .subscribe(
                data => {
                    this.procedureModel.Id = data.Id;
                    this.procedureModel.TransactionNumber = data.TransactionNumber;
                    this.procedureModel.TransactionDateTime = data.TransactionDateTime;
                    this.procedureModel.TransactionTime = data.TransactionTime;
                    this.procedureModel.DICOMFileName = data.DICOMFileName;
                    this.procedureModel.PatientName = data.PatientName;
                    this.procedureModel.Gender = data.Gender;
                    this.procedureModel.DateOfBirth = data.DateOfBirth;
                    this.procedureModel.Age = data.Age;
                    this.procedureModel.Particulars = data.Particulars;
                    this.procedureModel.ModalityId = data.ModalityId;
                    this.procedureModel.Modality = data.Modality;
                    this.procedureModel.BodyPartId = data.BodyPartId;
                    this.procedureModel.BodyPart = data.BodyPart;
                    this.procedureModel.User = data.User;
                    this.procedureModel.PatientAddress = data.PatientAddress;
                    this.procedureModel.ReferringPhysician = data.ReferringPhysician;
                    this.procedureModel.StudyDate = data.StudyDate;
                    this.procedureModel.HospitalNumber = data.HospitalNumber;
                    this.procedureModel.HospitalWardNumber = data.HospitalWardNumber;
                    this.procedureModel.StudyInstanceId = data.StudyInstanceId;
                }
            );
    }

    // =========================
    // Get Procedure Result Data
    // =========================
    public getProcedureResultData(): void {
        this.isProcedureResultProgressBarHidden = false;

        this.procedureService.getProcedureResult(this.getId());
        this.procedureResultSubscription = this.procedureService.procedureResultObservable.subscribe(
            data => {
                if (data != null) {
                    this.isProcedureResultProgressBarHidden = true;
                    if (data.length > 0) {
                        this.procedureResultData = data;
                        this.procedureResultCollectionView = new CollectionView(this.procedureResultData);
                        this.procedureResultCollectionView.pageSize = 15;
                        this.procedureResultCollectionView.trackChanges = true;
                    }
                } else {
                    this.isProcedureResultProgressBarHidden = true;
                }
            }
        );
    }

    // ====================
    // Add Procedure Result
    // ====================
    public btnAddProcedureResultClick(): void {
        this.procedureResultModel.Id = 0;
        this.procedureResultModel.ProcedureId = this.getId();
        this.procedureResultModel.ModalityProcedureId = 0;
        this.procedureResultModel.Result = "";
        this.procedureResultModel.DoctorId = 0;

        let detailProcedureResultDialogRef = this.dialog.open(ProcedureResultDetailDialogComponent, {
            width: '800px',
            data: {
                objProcedureResultDetailDialogTitle: "Add Procedure Result",
                objCurrentProcedureResult: this.procedureResultModel
            }
        });

        detailProcedureResultDialogRef.afterClosed().subscribe(result => {
            if (result == 200) {
                this.toastr.success('Save Successful!');
                this.getProcedureResultData();
            } else if (result == 404) {
                this.toastr.error('Not Found!');
            } else if (result == 400) {
                this.toastr.error('Bad Request!');
            } else if (result == 500) {
                this.toastr.error('Internal Server Error!');
            };
        });
    }

    // =====================
    // Edit Procedure Result
    // =====================
    public btnEditProcedureResultClick(): void {
        let currentProcedureResult = this.procedureResultCollectionView.currentItem;
        this.procedureResultModel.Id = currentProcedureResult.Id;
        this.procedureResultModel.ProcedureId = this.getId();
        this.procedureResultModel.ModalityProcedureId = currentProcedureResult.ModalityProcedureId;
        this.procedureResultModel.Result = currentProcedureResult.Result;
        this.procedureResultModel.DoctorId = currentProcedureResult.DoctorId;

        let detailProcedureResultDialogRef = this.dialog.open(ProcedureResultDetailDialogComponent, {
            width: '800px',
            data: {
                objProcedureResultDetailDialogTitle: "Edit Procedure Result",
                objCurrentProcedureResult: this.procedureResultModel
            }
        });

        detailProcedureResultDialogRef.afterClosed().subscribe(result => {
            if (result == 200) {
                this.toastr.success('Update Successful!');
                this.getProcedureResultData();
            } else if (result == 404) {
                this.toastr.error('Not Found!');
            } else if (result == 400) {
                this.toastr.error('Bad Request!');
            } else if (result == 500) {
                this.toastr.error('Internal Server Error!');
            };
        });
    }

    // =======================
    // Delete Procedure Result
    // =======================
    public btnDeleteProcedureResultClick(): void {
        let currentProcedureResult = this.procedureResultCollectionView.currentItem;
        this.procedureResultModel.Id = currentProcedureResult.Id;

        let deleteProcedureResultDialogRef = this.dialog.open(ProcedureResultDeleteDialogComponent, {
            width: '400px',
            data: {
                objProcedureResultDeleteDialogTitle: "Delete Procedure Result",
                objCurrentProcedureResult: this.procedureResultModel
            }
        });

        deleteProcedureResultDialogRef.afterClosed().subscribe(result => {
            if (result == 200) {
                this.toastr.success('Delete Successful!');
                this.getProcedureResultData();
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
        this.getProcedureDetailData();
        this.getProcedureResultData();
    }

    // ===============
    // On Destory Page
    // ===============
    ngOnDestroy() {
        if (this.procedureSubscription != null) this.procedureSubscription.unsubscribe();
        if (this.procedureResultSubscription != null) this.procedureResultSubscription.unsubscribe();
    }
}