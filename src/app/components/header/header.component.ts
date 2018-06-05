// =======
// Angular
// =======
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'header';
  currentUser = localStorage.getItem("username");

  // ===========
  // Constructor
  // ===========
  constructor(
    private router: Router,
    private toastr: ToastrService) {
  }

  // ======
  // Logout
  // ======
  public btnLogout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('username');
    localStorage.removeItem('current_facility_id');
    localStorage.removeItem('current_facility');

    this.toastr.success("Logout successful.");
    this.router.navigate(['/account/login']);
  }
}
