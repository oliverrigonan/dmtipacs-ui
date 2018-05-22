import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './modality-procedure-detail.dialog.component.html',
  styleUrls: ['../dialog.css']
})
export class ModalityProcedureDetailDialogComponent {
  // ================
  // Global Variables
  // ================
  title = 'modality procedure detail dialog';

  // ===========
  // Constructor
  // ===========
  constructor(
    public dialogRef: MatDialogRef<ModalityProcedureDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.objModalityDetailProcedureDialogTitle;
  }

  // =======================
  // Save Modality Procedure
  // =======================
  public btnSaveModalityProcedureClick(): void {
    
  }

  // ===============================
  // Close Modality Procedure Dialog
  // ===============================
  btnCloseModalityProcedureClick(): void {
    this.dialogRef.close();
  }
}
