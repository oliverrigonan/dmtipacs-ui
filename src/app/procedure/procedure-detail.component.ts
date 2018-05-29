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