import { Component, Input, OnInit } from '@angular/core';
import { SidebarItem, UserRole } from '@/models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss'],
})
export class SideBarItemComponent implements OnInit {
  @Input() item: SidebarItem;
  @Input() userRole: UserRole;

  treeControl = new NestedTreeControl<SidebarItem>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<SidebarItem>();

  ngOnInit(): void {
    this.dataSource.data = [this.item];
  }

  hasChild = (_: number, node: SidebarItem): boolean =>
    !!node.children?.length && node.children.length > 0;
}
