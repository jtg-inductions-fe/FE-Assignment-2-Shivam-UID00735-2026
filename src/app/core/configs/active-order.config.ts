import { TableColumn, ActiveOrders } from '@/models';

export const getActiveOrdersColumns = (handlers: {
  onAccept: (order: ActiveOrders) => void;
  onReject: (order: ActiveOrders) => void;
}): TableColumn<ActiveOrders>[] => [
  {
    key: 'orderId',
    header: 'ORDER ID',
    type: 'text',
    textConfig: { bold: true },
  },
  { key: 'restaurant', header: 'RESTAURANT', type: 'text' },
  { key: 'customer', header: 'CUSTOMER', type: 'text' },
  { key: 'items', header: 'ITEMS', type: 'text' },
  { key: 'amount', header: 'AMOUNT', type: 'text' },
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
        color: 'warn',
        handler: handlers.onReject,
      },
      {
        type: 'raised',
        label: 'Accept',
        icon: 'check',
        color: 'primary',
        handler: handlers.onAccept,
      },
    ],
  },
];
