import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@/core/services';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private breakPointObserver = inject(BreakpointObserver);

  title = 'restaurant-management-system';
  isSidebarOpen = true;
  isMobile = false;
  sideNavMode: 'side' | 'over' = 'side';

  ngOnInit(): void {
    this.breakPointObserver
      .observe('(max-width : 768px)')
      .subscribe((result) => {
        this.isMobile = result.matches;

        if (this.isMobile) {
          this.sideNavMode = 'over';
          this.isSidebarOpen = false;
        } else {
          this.sideNavMode = 'side';
          this.isSidebarOpen = true;
        }
      });
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

  canShowSidebar(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    return false;
  }
}
