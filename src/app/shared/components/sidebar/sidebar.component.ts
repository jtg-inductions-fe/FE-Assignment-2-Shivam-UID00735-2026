import { Component, inject, Input, OnInit } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { AuthService, SidebarService } from '@/core/services';

import { SidebarSection, UserRole } from '@/models';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarOpen = false;

  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);

  currentUserRole!: UserRole;
  sidebarSection!: SidebarSection[];

  async ngOnInit(): Promise<void> {
    try {
      this.currentUserRole = this.authService.getCurrentUserRole();

      this.sidebarSection = await firstValueFrom(
        this.sidebarService.getSidebarItem(),
      );
    } catch (error) {
      this.sidebarSection = [];
    }
  }
}
