import { Component, inject, Input } from '@angular/core';

import { ActiveOrders, TableColumn } from '@/models';
import { NotificationService } from '@/core/services';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.scss'],
})
export class ActiveOrdersComponent {
  @Input() activeOrdersItem: ActiveOrders[] = [];

  private notificationService = inject(NotificationService);

  activeOrderColumn: TableColumn[] = [
    {
      key: 'orderId',
      header: 'ORDER ID',
      type: 'text',
      textConfig: {
        bold: true,
      },
    },
    {
      key: 'restaurant',
      header: 'RESTAURANT',
      type: 'text',
    },
    {
      key: 'customer',
      header: 'CUSTOMER',
      type: 'text',
    },
    {
      key: 'items',
      header: 'ITEMS',
      type: 'text',
    },
    {
      key: 'amount',
      header: 'AMOUNT',
      type: 'text',
    },
    {
      key: 'status',
      header: 'STATUS',
      type: 'chip',
      chipConfig: {
        colorMap: {
          pending: 'accent',
          Accepted: 'primary',
          Rejected: 'warn',
          Completed: 'primary',
        },
      },
    },
    {
      key: 'actions',
      header: 'ACTIONS',
      type: 'button',
      buttonConfig: [
        {
          type: 'stroked',
          icon: 'close',
          label: 'Reject',
          color: 'primary',
          action: 'reject',
        },
        {
          type: 'flat',
          label: 'Accept',
          icon: 'check',
          color: 'primary',
          action: 'accept',
        },
      ],
    },
  ];

  handleTableAction(event: { action: string; row: unknown }): void {
    const order = event.row as ActiveOrders;

    switch (event.action) {
      case 'accept':
        this.acceptOrder(order);
        break;

      case 'reject':
        this.rejectOrder(order);
        break;
    }
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
