import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '@/core/services/auth.service';

import { User } from '@/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userData!: Omit<User, 'password'> | null;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (!user) {
        this.userData = null;
      }
      this.userData = user;
    });
  }

  onLogOut() {
    this.authService.logout();
  }
}
