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
import { UserModel } from '../model/user.model';
import { UserDoctorModel } from '../model/user-doctor.model';

@Injectable()
export class UserService {
    // ================================
    // Token: Headers and Authorization
    // ================================
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });
    private defaultAPIHostURL: string = "http://localhost:52125";

    // ================
    // Async Properties 
    // ================
    public userSource = new Subject<ObservableArray>();
    public userObservable = this.userSource.asObservable();
    public userDetailSource = new Subject<UserModel>();
    public userDetailObservable = this.userDetailSource.asObservable();
    public userTypeSource = new Subject<ObservableArray>();
    public userTypeObservable = this.userTypeSource.asObservable();
    public userUpdateSource = new Subject<number>();
    public userUpdateObservable = this.userUpdateSource.asObservable();
    public userDoctorSource = new Subject<ObservableArray>();
    public userDoctorObservable = this.userDoctorSource.asObservable();
    public doctorSource = new Subject<ObservableArray>();
    public doctorObservable = this.doctorSource.asObservable();
    public userDoctorSavedSource = new Subject<number>();
    public userDoctorSavedObservable = this.userDoctorSavedSource.asObservable();
    public userDoctorDeletedSource = new Subject<number>();
    public userDoctorDeletedObservable = this.userDoctorDeletedSource.asObservable();

    // ================
    // Initialize Model
    // ================
    public userDoctorModel: UserDoctorModel = {
        Id: 0,
        UserId: 0,
        DoctorId: 0,
    };

    // ===========
    // Constructor
    // ===========
    constructor(
        private router: Router,
        private http: Http
    ) { }

    // ========
    // Get User
    // ========
    public getUser(): void {
        let url = this.defaultAPIHostURL + "/api/user/list";
        let userObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userObservableArray.push({
                            Id: results[i].Id,
                            UserName: results[i].UserName,
                            FullName: results[i].FullName,
                            Address: results[i].Address,
                            ContactNumber: results[i].ContactNumber,
                            UserTypeId: results[i].UserTypeId,
                            UserType: results[i].UserType
                        });
                    }

                    this.userSource.next(userObservableArray);
                }
            },
            error => {
                this.userSource.next(null);
            }
        );
    }

    // ===============
    // Get User Detail
    // ===============
    public getUserDetail(id: number): void {
        let userModel: UserModel;
        let url = this.defaultAPIHostURL + "/api/user/detail/" + id;

        this.http.get(url, this.options).subscribe(
            response => {
                var result = response.json();
                if (result != null) {
                    userModel = {
                        Id: result.Id,
                        UserName: result.UserName,
                        Password: result.Password,
                        FullName: result.FullName,
                        Address: result.Address,
                        ContactNumber: result.ContactNumber,
                        UserTypeId: result.UserTypeId
                    };

                    this.userDetailSource.next(userModel);
                }
            },
            error => {
                this.userDetailSource.next(null);
            }
        );
    }

    // =============
    // Get User Type
    // =============
    public getUserType(): void {
        let url = this.defaultAPIHostURL + "/api/userType/list";
        let userTypeObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userTypeObservableArray.push({
                            Id: results[i].Id,
                            UserType: results[i].UserType
                        });
                    }

                    this.userTypeSource.next(userTypeObservableArray);
                }
            },
            error => {
                this.userTypeSource.next(null);
            }
        );
    }

    // ===========
    // Update User
    // ===========
    public updateUser(userModel: UserModel): void {
        let id = userModel.Id;
        let url = this.defaultAPIHostURL + "/api/user/update/" + id;
        this.http.put(url, JSON.stringify(userModel), this.options).subscribe(
            response => {
                this.userUpdateSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.userUpdateSource.next(404);
                } else if (error.status == 400) {
                    this.userUpdateSource.next(400);
                } else if (error.status == 500) {
                    this.userUpdateSource.next(500);
                }
            }
        )
    }

    // ===============
    // Get User Doctor
    // ===============
    public getUserDoctor(userId: number): void {
        let url = this.defaultAPIHostURL + "/api/userDoctor/list/" + userId;
        let userDoctorObservableArray = new ObservableArray();

        this.http.get(url, this.options).subscribe(
            response => {
                var results = new ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userDoctorObservableArray.push({
                            Id: results[i].Id,
                            UserId: results[i].UserId,
                            DoctorId: results[i].DoctorId,
                            Doctor: results[i].Doctor
                        });
                    }

                    this.userDoctorSource.next(userDoctorObservableArray);
                } else {
                    this.userDoctorSource.next(null);
                }
            },
            error => {
                this.userDoctorSource.next(null);
            }
        );
    }

    // ==========
    // Get Doctor
    // ==========
    public getDoctor(): void {
        let url = this.defaultAPIHostURL + "/api/user/list/byUserType/2";
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

    // ================
    // Save User Doctor
    // ================
    public saveUserDoctor(userDoctorModel: UserDoctorModel): void {
        if (userDoctorModel.Id == 0) {
            let url = this.defaultAPIHostURL + "/api/userDoctor/add";
            this.http.post(url, JSON.stringify(userDoctorModel), this.options).subscribe(
                response => {
                    this.userDoctorSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.userDoctorSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.userDoctorSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.userDoctorSavedSource.next(500);
                    }
                }
            )
        } else {
            let id = userDoctorModel.Id;
            let url = this.defaultAPIHostURL + "/api/userDoctor/update/" + id;
            this.http.put(url, JSON.stringify(userDoctorModel), this.options).subscribe(
                response => {
                    this.userDoctorSavedSource.next(200);
                },
                error => {
                    if (error.status == 404) {
                        this.userDoctorSavedSource.next(404);
                    } else if (error.status == 400) {
                        this.userDoctorSavedSource.next(400);
                    } else if (error.status == 500) {
                        this.userDoctorSavedSource.next(500);
                    }
                }
            )
        }
    }

    // ==================
    // Delete User Doctor
    // ==================
    public deleteUserDoctor(id: number): void {
        let url = this.defaultAPIHostURL + "/api/userDoctor/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.userDoctorDeletedSource.next(200);
            },
            error => {
                if (error.status == 404) {
                    this.userDoctorDeletedSource.next(404);
                } else if (error.status == 400) {
                    this.userDoctorDeletedSource.next(400);
                } else if (error.status == 500) {
                    this.userDoctorDeletedSource.next(500);
                }
            }
        )
    }
}