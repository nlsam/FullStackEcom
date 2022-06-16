import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
  httpClient: any;

  // nodatabase(): void {

  //   Swal.fire("Server is currently down! Please try again later.");
  // }
}
