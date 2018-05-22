import { Component } from '@angular/core';

@Component({
  selector: 'app-modality-procedure',
  templateUrl: './modality-procedure.component.html',
  styleUrls: ['./modality-procedure.component.css']
})
export class ModalityProcedureComponent {
  title = 'Modality Procedure';

  data: any;
  constructor() {
    this.data = [
      { id: 1, name: 'sample', price: 100 },
      { id: 2, name: 'sample', price: 100 },
      { id: 3, name: 'sample', price: 200 },
      { id: 4, name: 'sample', price: 150 },
      { id: 5, name: 'sample', price: 200 }
    ];
  }
}
