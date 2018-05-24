// =======
// Angular
// =======
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =======
// Service
// =======
import { UserService } from './user.service';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';

// =====
// Model
// =====
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user.component.css', '../layout/layout.component.css']
})
export class UserDetailComponent {
  title = 'user detail';
  isUserDoctorProgressBarHidden = false;

  // ==========================
  // User Async Task Properties
  // ==========================
  public userSubscription: any;
  public userTypeSubscription: any;
  public cboUserTypeObservableArray: ObservableArray;

  // ================
  // Initialize Model
  // ================
  public userModel: UserModel = {
    Id: 0,
    UserName: "",
    Password: "",
    FullName: "",
    Address: "",
    ContactNumber: "",
    UserTypeId: 0
  };

  // =================================
  // User Doctor Async Task Properties
  // =================================
  public userDoctorSubscription: any;
  public userDoctorData: ObservableArray = new ObservableArray();
  public userDoctorCollectionView: CollectionView = new CollectionView(this.userDoctorData);

  // ===========
  // Constructor
  // ===========
  constructor(
    private userService: UserService,
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

  // ====================
  // Get User Detail Data
  // ====================
  public getUserDetailData() {
    this.userService.getUserDetail(this.getId());

    this.userSubscription = this.userService.userDetailObservable
      .subscribe(
        data => {
          this.userModel.Id = data.Id;
          this.userModel.UserName = data.UserName;
          this.userModel.FullName = data.FullName;
          this.userModel.Address = data.Address;
          this.userModel.ContactNumber = data.ContactNumber;
          this.userModel.UserTypeId = data.UserTypeId;

          this.getUserTypeData(this.userModel.UserTypeId);
        }
      );
  }

  // ==================
  // Get User Type Data
  // ==================
  public getUserTypeData(userTypeId: number): void {
    this.userService.getUserType();
    this.userTypeSubscription = this.userService.userTypeObservable.subscribe(
      data => {
        let modalityObservableArray = new ObservableArray();

        if (data.length > 0) {
          for (var i = 0; i <= data.length - 1; i++) {
            modalityObservableArray.push({
              Id: data[i].Id,
              UserType: data[i].UserType,
            });
          }
        }

        this.cboUserTypeObservableArray = modalityObservableArray;

        setTimeout(() => {
          this.userModel.UserTypeId = userTypeId;
        }, 1000);
      }
    );
  }

  // ===========
  // Update User
  // ===========
  public updateUserClick() {
    let btnUpdateUser: Element = document.getElementById("btnUpdateUser");
    btnUpdateUser.setAttribute("disabled", "disabled");
    btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Updating...";

    let btnCloseUser: Element = document.getElementById("btnCloseUser");
    btnCloseUser.setAttribute("disabled", "disabled");

    this.userService.updateUser(this.userModel);
    this.userSubscription = this.userService.userUpdateObservable.subscribe(
      data => {
        if (data == 200) {
          this.toastr.success("Update Successful!");
          btnUpdateUser.removeAttribute("disabled");
          btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Update";
          btnCloseUser.removeAttribute("disabled");
        } else if (data == 404) {
          this.toastr.error('Not Found!');
          btnUpdateUser.removeAttribute("disabled");
          btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Update";
          btnCloseUser.removeAttribute("disabled");
        } else if (data == 400) {
          this.toastr.error('Bad Request!');
          btnUpdateUser.removeAttribute("disabled");
          btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Update";
          btnCloseUser.removeAttribute("disabled");
        } else if (data == 500) {
          this.toastr.error('Internal Server Error!');
          btnUpdateUser.removeAttribute("disabled");
          btnUpdateUser.innerHTML = "<i class='fa fa-check fa-fw'></i> Update";
          btnCloseUser.removeAttribute("disabled");
        }
      }
    );
  }

  // ====================
  // Get User Doctor Data
  // ====================
  public getUserDoctorData(): void {
    this.isUserDoctorProgressBarHidden = false;

    this.userService.getUserDoctor(this.getId());
    this.userDoctorSubscription = this.userService.userDoctorObservable.subscribe(
      data => {
        if (data != null) {
          this.isUserDoctorProgressBarHidden = true;
          if (data.length > 0) {
            this.userDoctorData = data;
            this.userDoctorCollectionView = new CollectionView(this.userDoctorData);
            this.userDoctorCollectionView.pageSize = 15;
            this.userDoctorCollectionView.trackChanges = true;
          }
        } else {
          this.isUserDoctorProgressBarHidden = true;
        }
      }
    );
  }

  // ============
  // On Load Page
  // ============
  ngOnInit() {
    this.getUserDetailData();
    this.getUserDoctorData();
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.userSubscription != null) this.userSubscription.unsubscribe();
    if (this.userTypeSubscription != null) this.userTypeSubscription.unsubscribe();
    if (this.userDoctorSubscription != null) this.userDoctorSubscription.unsubscribe();
  }
}
