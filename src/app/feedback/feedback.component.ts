import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  confirmUser = false;
  didFail = false;
  isLoading = false;
  // @ViewChild('usrForm', {static: false}) form: NgForm;

  constructor() { }

  ngOnInit() {
  }
  custommsg() {
  console.log('custommsg');
  }

  onSubmit() {
   // const usrName = this.form.value.username;
    // const password = this.form.value.password;
    // const comment = this.form.value.comment;
    console.log('onSubmit');
    // this.myString = this.authService.signIn(usrName, password);
    // console.log(this.myString);
  }


}
