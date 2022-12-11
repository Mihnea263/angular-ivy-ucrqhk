import { Component, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  
  isAuthenticated:boolean=false;
  userFullName:string;


  constructor(private oktaAuthService:OktaAuth) { }

  ngOnInit(): void {
    //subscribe to auth state changes
    this.oktaAuthService.authStateManager.subscribe(
      (result)=>{
        this.isAuthenticated=result;
        this.getUserDetails();
        console.log(this.userFullName)
      }
    )
  }
  getUserDetails() {
    if(this.isAuthenticated){
      //fetch logged data
      this.oktaAuthService.getUser().then(
        (res)=>{
          this.userFullName=res.name;
        }
      )
      
    }
  }

  logout(){
    this.oktaAuthService.signOut();
  }

}
