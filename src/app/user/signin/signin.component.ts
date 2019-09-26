import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild('usrForm', {static: false}) form: NgForm;
  didFail = false;
  isLoading = false;
  myString: string;
  private subscription: Subscription;
  constructor(private authService: AuthService, private messageService: MessageService ) {  }

  ngOnInit() {
    console.log('signin component ngoninit' );
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.authService.authDidFail.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  ngOnDestroy() {
  // this.subscription.unsubscribe();
}
  onSubmit() {
    const usrName = this.form.value.username;
    const password = this.form.value.password;
    this.myString = this.authService.signIn(usrName, password);
    // console.log(this.myString);
  }
}
