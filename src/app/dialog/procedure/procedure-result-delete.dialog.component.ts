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
    selector: 'app-procedure-result-delete-dialog',
    templateUrl: './procedure-result-delete.dialog.component.html',
    styleUrls: ['../dialog.css']
})
export class ProcedureResultDeleteDialogComponent {
    title = 'Delete Procedure Result';
}