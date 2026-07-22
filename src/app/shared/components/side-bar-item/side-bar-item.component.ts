import { Component, inject, Input, OnInit } from '@angular/core';
import { SidebarItem, UserRole } from '@/models';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AuthService } from '@/core/services/auth.service';
import { Router } from '@angular/router';

import { ROUTES } from '@/core/constants';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss'],
})
export class SideBarItemComponent implements OnInit {
  @Input() item: SidebarItem;
  @Input() userRole: UserRole;

  private authService = inject(AuthService);
  private router = inject(Router);

  treeControl = new NestedTreeControl<SidebarItem>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<SidebarItem>();

  ngOnInit(): void {
    this.dataSource.data = [this.item];
  }

  hasChild = (_: number, node: SidebarItem): boolean =>
    !!node.children?.length && node.children.length > 0;

  navigate(item: SidebarItem) {
    if (
      item.title === 'Overview' &&
      this.authService.getCurrentUserRole() === 'owner'
    ) {
      const id = this.authService.getOwnersRestaurantIds()?.[0];
      this.router.navigate([ROUTES.dashboardPageRoute, id]);
    }

    return this.router.navigate([item.href]);
  }
}
