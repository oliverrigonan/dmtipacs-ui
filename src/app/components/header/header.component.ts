// =======
// Angular
// =======
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ======
// Toastr
// ======
import { ToastrService } from 'ngx-toastr';

// =======
// Service
// =======
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'header';
  currentUser = localStorage.getItem("username");

  // ==========================================
  // Account Subscription Async Task Properties
  // ==========================================
  private logoutSubscription: any;

  // ===========
  // Constructor
  // ===========
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) {
  }

  // ======
  // Logout
  // ======
  public btnLogout(): void {
    this.accountService.logout();
    this.logoutSubscription = this.accountService.logoutObservable.subscribe(
      data => {
        if (data == 1) {
          this.toastr.success("Logout successful.");
          window.location.reload();
        }
      }
    );

    setTimeout(() => {
      if (this.logoutSubscription != null) this.logoutSubscription.unsubscribe();
    }, 500);
  }
}
