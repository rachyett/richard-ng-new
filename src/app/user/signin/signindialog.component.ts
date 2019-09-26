import { Component } from '@angular/core';

@Component({
  selector: 'app-signin-dialog',
  template: ` <h1> Problem Signing In</h1>
  <mat-dialog-actions>
  <button mat-button [mat-dialog-close]='true' >Retry</button>
  <button mat-button [mat-dialog-close]='false' >Cancel</button>
  </mat-dialog-actions> `
})
export class SigninDialogComponent {

}
