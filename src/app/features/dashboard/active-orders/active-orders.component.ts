import { Component, Input } from '@angular/core';

import { ActiveOrders, TableColumn } from '@/models';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.scss'],
})
export class ActiveOrdersComponent {
  @Input() activeOrdersItem: ActiveOrders[] = [];

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
          type: 'flat',
          label: 'Accept',
          color: 'primary',
          action: 'accept',
        },
        {
          type: 'stroked',
          label: 'Reject',
          color: 'warn',
          action: 'reject',
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
    console.log('Accepted', order);
  }

  rejectOrder(order: ActiveOrders): void {
    console.log('Rejected', order);
  }
}
