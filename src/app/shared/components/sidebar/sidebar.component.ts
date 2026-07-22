import { Component, inject, Input, OnInit } from '@angular/core';
import { SidebarService } from '@/core/services/sidebar.service';
import { AuthService } from '@/core/services/auth.service';
import { SidebarSection } from '@/models/navigation.model';
import { firstValueFrom } from 'rxjs';
import { UserRole } from '@/models/navigation.model';
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
      console.error('Unable to fetch sidebar data', error);
      this.sidebarSection = [];
    }
  }
}
