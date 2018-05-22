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

@Injectable()
export class ModalityProcedureService {
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
    public modalityProcedureSource = new Subject<ObservableArray>();
    public modalityProcedureObservable = this.modalityProcedureSource.asObservable();

    // ===========
    // Constructor
    // ===========
    constructor(
        private router: Router,
        private http: Http
    ) { }

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
                            id: results[i].Id,
                            ModalityId: results[i].ModalityId,
                            Modality: results[i].Modality,
                            ModalityProcedure: results[i].ModalityProcedure,
                            ModalityResultTemplate: results[i].ModalityResultTemplate
                        });
                    }

                    this.modalityProcedureSource.next(modalityProcedureObservableArray);
                }
            }
        );
    }
}