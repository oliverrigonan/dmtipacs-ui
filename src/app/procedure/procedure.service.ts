// =======
// Angular
// =======
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// =============
// Async Classes
// =============
import { ObservableArray } from 'wijmo/wijmo';
import { Subject, Observable } from 'rxjs';

// =====
// Model
// =====
import { ProcedureModel } from '../model/procedure.model';
import { ProcedureResultModel } from '../model/procedure-result.model';

@Injectable()
export class ProcedureService {
    // ================================
    // Token: Headers and Authorization
    // ================================
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // ================
    // Async Properties 
    // ================
    public procedureSource = new Subject<ObservableArray>();
    public procedureObservable = this.procedureSource.asObservable();
    public procedureDetailSource = new Subject<ProcedureModel>();
    public procedureDetailObservable = this.procedureDetailSource.asObservable();
    public procedureSavedSource = new Subject<number>();
    public procedureSavedObservable = this.procedureSavedSource.asObservable();
    public procedureDeletedSource = new Subject<number>();
    public procedureDeletedObservable = this.procedureDeletedSource.asObservable();
    public procedureResultSource = new Subject<ObservableArray>();
    public procedureResultObservable = this.procedureResultSource.asObservable();
    public modalityProcedureSource = new Subject<ObservableArray>();
    public modalityProcedureObservable = this.modalityProcedureSource.asObservable();
    public doctorSource = new Subject<ObservableArray>();
    public doctorObservable = this.doctorSource.asObservable();
    public procedureResultSavedSource = new Subject<number>();
    public procedureResultSavedObservable = this.procedureResultSavedSource.asObservable();
    public procedureResultDeletedSource = new Subject<number>();
    public procedureResultDeletedObservable = this.procedureResultDeletedSource.asObservable();
    public procedureComparativeSource = new Subject<ObservableArray>();
    public procedureComparativeObservable = this.procedureComparativeSource.asObservable();

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
        private router: Router,
        private http: Http
    ) { }

    // =============
    // Get Procedure
    // =============
    public getProcedure(startDate: string, endDate: string): void {
        let url = "http://localhost:52125/api/procedure/list/byDateRange/" + startDate + "/" + endDate + "/24";
        let procedureObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        procedureObservableArray.push({
                            Id: results[i].Id,
                            TransactionNumber: results[i].TransactionNumber,
                            TransactionDateTime: results[i].TransactionDateTime,
                            TransactionTime: results[i].TransactionTime,
                            PatientName: results[i].PatientName,
                            Gender: results[i].Gender,
                            Age: results[i].Age,
                            Modality: results[i].Modality,
                            BodyPart: results[i].BodyPart,
                            Doctor: results[i].Doctor
                        });
                    }

                    this.procedureSource.next(procedureObservableArray);
                }
            },
            error => {
                this.procedureSource.next(null);
            }
        );
    }

    // ====================
    // Get Procedure Detail
    // ====================
    public getProcedureDetail(id: number): void {
        let procedureModel: ProcedureModel;
        let url = "http://localhost:52125/api/procedure/detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    procedureModel = {
                        Id: result.Id,
                        TransactionNumber: result.TransactionNumber,
                        TransactionDateTime: result.TransactionDateTime,
                        TransactionTime: result.TransactionTime,
                        DICOMFileName: result.DICOMFileName,
                        PatientName: result.PatientName,
                        Gender: result.Gender,
                        DateOfBirth: result.DateOfBirth,
                        Age: result.Age,
                        Particulars: result.Particulars,
                        ModalityId: result.ModalityId,
                        Modality: result.Modality,
                        BodyPartId: result.BodyPartId,
                        BodyPart: result.BodyPart,
                        UserId: result.UserId,
                        User: result.User,
                        PatientAddress: result.PatientAddress,
                        ReferringPhysician: result.ReferringPhysician,
                        StudyDate: result.StudyDate,
                        HospitalNumber: result.HospitalNumber,
                        HospitalWardNumber: result.HospitalWardNumber,
                        StudyInstanceId: result.StudyInstanceId
                    };

                    this.procedureDetailSource.next(procedureModel);
                }
            },
            error => {
                this.procedureDetailSource.next(null);
            }
        );
    }

    // ================
    // Delete Procedure
    // ================
    public deleteProcedure(id: number): void {
        let url = "http://localhost:52125/api/procedureProcedure/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.procedureDeletedSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.procedureDeletedSource.next(404);
                } else if (error.status == 400) {
                    this.procedureDeletedSource.next(400);
                } else if (error.status == 500) {
                    this.procedureDeletedSource.next(500);
                }
            }
        )
    }

    // ====================
    // Get Procedure Result
    // ====================
    public getProcedureResult(procedureId: number): void {
        let url = "http://localhost:52125/api/procedureResult/list/" + procedureId;
        let procedureResultObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        procedureResultObservableArray.push({
                            Id: results[i].Id,
                            ProcedureId: results[i].ProcedureId,
                            ModalityProcedureId: results[i].ModalityProcedureId,
                            ModalityProcedure: results[i].ModalityProcedure,
                            Result: results[i].Result,
                            DoctorId: results[i].DoctorId,
                            Doctor: results[i].Doctor,
                            DoctorDateTime: results[i].DoctorDateTime,
                            DoctorTime: results[i].DoctorTime
                        });
                    }

                    this.procedureResultSource.next(procedureResultObservableArray);
                } else {
                    this.procedureResultSource.next(null);
                }
            },
            error => {
                this.procedureResultSource.next(null);
            }
        );
    }

    // ======================
    // Get Modality Procedure
    // ======================
    public getModalityProcedure(): void {
        let url = "http://localhost:52125/api/modalityProcedure/list";
        let modalityProcedureObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        modalityProcedureObservableArray.push({
                            Id: results[i].Id,
                            ModalityProcedure: results[i].ModalityProcedure,
                        });
                    }

                    this.modalityProcedureSource.next(modalityProcedureObservableArray);
                }
            },
            error => {
                this.modalityProcedureSource.next(null);
            }
        );
    }

    // ==========
    // Get Doctor
    // ==========
    public getDoctor(): void {
        let url = "http://localhost:52125/api/user/list/byUserType/2";
        let doctorObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        doctorObservableArray.push({
                            Id: results[i].Id,
                            FullName: results[i].FullName
                        });
                    }

                    this.doctorSource.next(doctorObservableArray);
                } else {
                    this.doctorSource.next(null);
                }
            },
            error => {
                this.doctorSource.next(null);
            }
        );
    }

    // =====================
    // Save Procedure Result
    // =====================
    public saveProcedureResult(procedureResultModel: ProcedureResultModel): void {
        if (procedureResultModel.Id == 0) {
            let url = "http://localhost:52125/api/procedureResult/add";
            this.http.post(url, JSON.stringify(procedureResultModel), this.options).subscribe(
                response => {
                    this.procedureResultSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.procedureResultSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.procedureResultSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.procedureResultSavedSource.next(500);
                    }
                }
            )
        } else {
            let id = procedureResultModel.Id;
            let url = "http://localhost:52125/api/procedureResult/update/" + id;
            this.http.put(url, JSON.stringify(procedureResultModel), this.options).subscribe(
                response => {
                    this.procedureResultSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.procedureResultSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.procedureResultSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.procedureResultSavedSource.next(500);
                    }
                }
            )
        }
    }

    // =======================
    // Delete Procedure Result
    // =======================
    public deleteProcedureResult(id: number): void {
        let url = "http://localhost:52125/api/procedureResult/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.procedureResultDeletedSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.procedureResultDeletedSource.next(404);
                } else if (error.status == 400) {
                    this.procedureResultDeletedSource.next(400);
                } else if (error.status == 500) {
                    this.procedureResultDeletedSource.next(500);
                }
            }
        )
    }

    // =========================
    // Get Procedure Comparative
    // =========================
    public getProcedureComparative(id: number): void {
        let url = "http://localhost:52125/api/procedure/list/comparative/" + id + "/24";
        let procedureComparativeObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        procedureComparativeObservableArray.push({
                            Id: results[i].Id,
                            TransactionNumber: results[i].TransactionNumber,
                            TransactionDateTime: results[i].TransactionDateTime,
                            TransactionTime: results[i].TransactionTime,
                            PatientName: results[i].PatientName,
                            Gender: results[i].Gender,
                            Age: results[i].Age,
                            Modality: results[i].Modality,
                            BodyPart: results[i].BodyPart,
                            Doctor: results[i].Doctor
                        });
                    }

                    this.procedureComparativeSource.next(procedureComparativeObservableArray);
                } else {
                    this.procedureComparativeSource.next(null);
                }
            },
            error => {
                this.procedureComparativeSource.next(null);
            }
        );
    }
}