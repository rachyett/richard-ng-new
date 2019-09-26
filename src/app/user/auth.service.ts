import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject ,  Observable ,  BehaviorSubject } from 'rxjs';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';


import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';

import { User } from './user.model';

const POOL_DATA = {
UserPoolId: 'us-east-1_b94tIYQaf',
ClientId: '2ourt6k5kno0dcuomg7odvp2u0',
};
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  registeredUser: CognitoUser;
  errorMsg: string;
  private subscription: Subscription;
  message = {};

  constructor(private router: Router, private messageService: MessageService) {}
  signUp(username: string, email: string, password: string): void {
    this.authIsLoading.next(true);
    this.errorMsg = 'some error';
    const user: User = {
      username,
      email,
      password
    };
    const attrList: CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };
    attrList.push(new CognitoUserAttribute(emailAttribute));
    userPool.signUp(user.username, user.password, attrList, null, (err, result) => {
      if (err) {
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        return;
      }
      this.authDidFail.next(false);
      this.authIsLoading.next(false);
      this.registeredUser = result.user;

    });
    return;
  }
  confirmUser(username: string, code: string) {
    this.authIsLoading.next(true);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration( code, true, (err, result) => {
      if (err) {
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        console.log('cognitoConfirmRegistration failed');
        return;
      }
      this.authDidFail.next(false);
      this.authIsLoading.next(false);
      console.log('cognitoConfirmRegistration success');
      this.router.navigate(['/']);
    });
  }
  signIn(username: string, password: string): string {
    console.log('SignIn');
    this.authIsLoading.next(true);
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;

    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        that.authStatusChanged.next(true);
        that.authDidFail.next(false);
        that.authIsLoading.next(false);
        console.log(result);
        console.log('signinsuccessfull');
      },
      onFailure(err) {
        that.authDidFail.next(true);
        that.authIsLoading.next(false);
        console.log(err);
     //  this.errorMsg = err.name;  // my addition
       // this.errorMsg = err;

      }
    });
    this.authStatusChanged.next(true);
    this.messageService.add(this.errorMsg);
    return this.errorMsg;
  }
  getAuthenticatedUser() {
    console.log('getauthenticateduser');
    return userPool.getCurrentUser();
  }
  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }
  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session ) => {
            if (err) {
              observer.next(false);
            } else {
              if (session.isValid()) {
                observer.next(true);
              } else {
                observer.next(false);
              }
            }
        });
      }
      observer.complete();
    });
    return obs;
  }
  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => this.authStatusChanged.next(auth)
    );
  }
}
