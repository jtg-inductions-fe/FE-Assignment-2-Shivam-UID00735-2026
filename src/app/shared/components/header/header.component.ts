import { Component, inject } from '@angular/core';

import { AuthService } from '@/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;

  logOut() {
    this.authService.logout();
  }
}
