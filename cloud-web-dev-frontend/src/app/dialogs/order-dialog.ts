import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OrderDialogData } from '../interfaces/order-dialog-data';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'order-dialog',
  templateUrl: 'order-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class OrderDialog {
  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDialogData
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      return form.value;
    }
  }
}
