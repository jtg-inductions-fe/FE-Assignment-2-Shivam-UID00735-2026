import { Component, EventEmitter, inject, Output } from '@angular/core';

import { AuthService } from '@/core/services';
import { APP_CONSTANT_CONFIG } from '@/core/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;
  defaultImage = APP_CONSTANT_CONFIG.defaultImageURL;
  @Output() toggleSideBar = new EventEmitter<void>();

  logOut() {
    this.authService.logout();
  }

  onMenuClick() {
    this.toggleSideBar.emit();
  }
}
