// ====================
// Angular and Material
// ====================
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =======
// Dialogs
// =======
import { BodyPartsDetailDialogComponent } from '../dialog/body-parts/body-parts-detail.dialog.component';
import { BodyPartsDeleteDialogComponent } from '../dialog/body-parts/body-parts-delete.dialog.component';

// ====================
// Async Task and Wijmo
// ====================
import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { BodyPartsService } from './body-parts.service';

// =====
// Model
// =====
import { BodyPartsModel } from '../model/body-parts.model';

@Component({
  selector: 'app-body-parts',
  templateUrl: './body-parts.component.html',
  styleUrls: ['./body-parts.component.css', '../layout/layout.component.css']
})
export class BodyPartsComponent {
  // ================
  // Global Variables
  // ================
  title = 'body parts';
  isProgressBarHidden = false;

  // ================================
  // Body Parts Async Task Properties
  // ================================
  public bodyPartsSubscription: any;
  public bodyPartsData: ObservableArray = new ObservableArray();
  public bodyPartsCollectionView: CollectionView = new CollectionView(this.bodyPartsData);

  public isBtnRefreshBodyPartsDataDisabled: Boolean = true;

  // ================
  // Initialize Model
  // ================
  public bodyPartsModel: BodyPartsModel = {
    Id: 0,
    BodyPart: ""
  };

  // ===========
  // Constructor
  // ===========
  constructor(
    public dialog: MatDialog,
    private bodyPartsService: BodyPartsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // ===================
  // Get Body Parts Data
  // ===================
  public getBodyPartsData(): void {
    this.isBtnRefreshBodyPartsDataDisabled = true;
    this.isProgressBarHidden = false;

    this.bodyPartsService.getBodyParts();
    this.bodyPartsSubscription = this.bodyPartsService.bodyPartsObservable.subscribe(
      data => {
        if (data != null) {
          this.isProgressBarHidden = true;
          if (data.length > 0) {
            this.bodyPartsData = data;
            this.bodyPartsCollectionView = new CollectionView(this.bodyPartsData);
            this.bodyPartsCollectionView.pageSize = 15;
            this.bodyPartsCollectionView.trackChanges = true;
          }
        } else {
          this.isProgressBarHidden = true;
        }

        this.isBtnRefreshBodyPartsDataDisabled = false;
      }
    );
  }

  // ==============
  // Add Body Parts
  // ==============
  public btnAddBodyPartsClick(): void {
    this.bodyPartsModel.Id = 0;
    this.bodyPartsModel.BodyPart = "";

    let detailBodyPartsDialogRef = this.dialog.open(BodyPartsDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Add Body Part",
        objCurrentBodyParts: this.bodyPartsModel
      }
    });

    detailBodyPartsDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Save Successful!');
        this.getBodyPartsData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // ===============
  // Edit Body Parts
  // ===============
  public btnEditBodyPartsClick(): void {
    let currentBodyParts = this.bodyPartsCollectionView.currentItem;
    this.bodyPartsModel.Id = currentBodyParts.Id;
    this.bodyPartsModel.BodyPart = currentBodyParts.BodyPart;

    let detailBodyPartsDialogRef = this.dialog.open(BodyPartsDetailDialogComponent, {
      width: '800px',
      data: {
        objModalityDetailProcedureDialogTitle: "Edit Body Part",
        objCurrentBodyParts: this.bodyPartsModel
      }
    });

    detailBodyPartsDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Update Successful!');
        this.getBodyPartsData();
      } else if (result == 404) {
        this.toastr.error('Not Found!');
      } else if (result == 400) {
        this.toastr.error('Bad Request!');
      } else if (result == 500) {
        this.toastr.error('Internal Server Error!');
      };
    });
  }

  // =================
  // Delete Body Parts
  // =================
  public btnDeleteBodyPartsClick(): void {
    let currentBodyParts = this.bodyPartsCollectionView.currentItem;
    this.bodyPartsModel.Id = currentBodyParts.Id;

    let deleteBodyPartsDialogRef = this.dialog.open(BodyPartsDeleteDialogComponent, {
      width: '400px',
      data: {
        objBodyPartsDeleteDialogTitle: "Delete Body Part",
        objCurrentBodyParts: this.bodyPartsModel
      }
    });

    deleteBodyPartsDialogRef.afterClosed().subscribe(result => {
      if (result == 200) {
        this.toastr.success('Delete Successful!');
        this.getBodyPartsData();
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
    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['/account/login']);
    } else {
      this.getBodyPartsData();
    }
  }

  // ===============
  // On Destory Page
  // ===============
  ngOnDestroy() {
    if (this.bodyPartsSubscription != null) this.bodyPartsSubscription.unsubscribe();
  }
}
