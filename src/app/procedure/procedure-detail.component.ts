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
}