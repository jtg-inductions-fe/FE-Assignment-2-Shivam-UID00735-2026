import { Component, EventEmitter, inject, Output } from '@angular/core';

import { AuthService } from '@/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;
  defaultImage = 'assets/images/avatars/default-avatar.png';
  @Output() toggleSideBar = new EventEmitter<void>();

  logOut() {
    this.authService.logout();
  }

  onMenuClick() {
    this.toggleSideBar.emit();
  }
}
