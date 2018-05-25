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
    public procedureSavedSource = new Subject<number>();
    public procedureSavedObservable = this.procedureSavedSource.asObservable();
    public procedureDeletedSource = new Subject<number>();
    public procedureDeletedObservable = this.procedureDeletedSource.asObservable();

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

    // ==============
    // Save Procedure
    // ==============
    public saveProcedure(procedureModel: ProcedureModel): void {
        if (procedureModel.Id == 0) {
            let url = "http://localhost:52125/api/userProcedure/add";
            this.http.post(url, JSON.stringify(procedureModel), this.options).subscribe(
                response => {
                    this.procedureSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.procedureSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.procedureSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.procedureSavedSource.next(500);
                    }
                }
            )
        } else {
            let id = procedureModel.Id;
            let url = "http://localhost:52125/api/userProcedure/update/" + id;
            this.http.put(url, JSON.stringify(procedureModel), this.options).subscribe(
                response => {
                    this.procedureSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.procedureSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.procedureSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.procedureSavedSource.next(500);
                    }
                }
            )
        }
    }

    // ================
    // Delete Procedure
    // ================
    public deleteProcedure(id: number): void {
        let url = "http://localhost:52125/api/userProcedure/delete/" + id;
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
}