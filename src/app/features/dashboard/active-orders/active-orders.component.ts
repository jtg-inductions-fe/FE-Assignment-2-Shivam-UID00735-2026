import { Component, inject, Input, OnInit } from '@angular/core';
import { ActiveOrders, TableColumn } from '@/models';
import { NotificationService } from '@/core/services';
import { getActiveOrdersColumns } from '@/core/configs/active-order.config';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.scss'],
})
export class ActiveOrdersComponent implements OnInit {
  @Input() activeOrdersItem: ActiveOrders[] = [];

  private notificationService = inject(NotificationService);

  activeOrderColumn: TableColumn<ActiveOrders>[] = [];

  ngOnInit(): void {
    this.activeOrderColumn = getActiveOrdersColumns({
      onAccept: (order) => this.acceptOrder(order),
      onReject: (order) => this.rejectOrder(order),
    });
  }

  acceptOrder(order: ActiveOrders): void {
    this.updateOrderStatus(order, 'Accepted');
    this.notificationService.showSuccessMessage(
      `Order #${order.orderId} accepted`,
      'close',
    );
  }

  rejectOrder(order: ActiveOrders): void {
    this.updateOrderStatus(order, 'Rejected');
    this.notificationService.showSuccessMessage(
      `Order #${order.orderId} rejected`,
      'close',
    );
  }

  private updateOrderStatus(
    order: ActiveOrders,
    status: ActiveOrders['status'],
  ): void {
    this.activeOrdersItem = this.activeOrdersItem.map((item) =>
      item.orderId === order.orderId ? { ...item, status } : item,
    );
  }
}
