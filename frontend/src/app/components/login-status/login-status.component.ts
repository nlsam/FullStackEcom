import { Component, HostListener, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { ActivityServiceService } from 'src/app/services/activity-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean =false;
  userFullName: string;
  storage: Storage= sessionStorage;
  

  constructor(private oktaAuthService: OktaAuthService,
              private activityService: ActivityServiceService) { }

  logoutAlert(): void {

    Swal.fire("You are being logged out due to inactivity!");
  }

  ngOnInit(): void {
    // Subscribe to the authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result)=>{
        this.isAuthenticated= result;
        this.getUserDetails();
      }
    )
    this.activityService.active$.subscribe(s => console.log('User acitivity detected!'));

    // Old inactivity logout alert
   /* this.activityService.inactive$.subscribe(s =>{ alert('You are being logged out due to inactivity'),
                                                   this.logout(),
                                                   console.log('User logged due to inactivity')*/

    this.activityService.inactive$.subscribe(s =>{ this.logoutAlert(),
                                                   this.logout(),
                                                   console.log('User logged due to inactivity')

    })
    
  }

 
  getUserDetails() {
    if(this.isAuthenticated){
      //Fetch the logged in user details (user's claims)
      // user full name is exposed as a property name
      this.oktaAuthService.getUser().then(
        res => {
          this.userFullName=res.name;

          // retrieve the user's email from authenication response
          const theEmail = res.email;

          // now store the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));

        }
      );
    }
  }
  logout(){
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuthService.signOut();

    
  }

}
