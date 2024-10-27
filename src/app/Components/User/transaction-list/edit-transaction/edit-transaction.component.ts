import { Component } from '@angular/core';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [DynamicDialogModule ],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss'
})
export class EditTransactionComponent {

}
