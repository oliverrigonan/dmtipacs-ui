// =======
// Angular
// =======
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// =================
// Service and Model
// =================
import { ProcedureModel } from '../../model/procedure.model';
import { ProcedureService } from '../../procedure/procedure.service';

@Component({
    selector: 'app-procedure-result-detail-dialog',
    templateUrl: './procedure-result-detail.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ProcedureResultDetailDialogComponent {
    title = 'Detail Procedure Result';
}