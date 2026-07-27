import { TableColumn, Restaurant } from '@/models';

export const getRestaurantColumns = (handlers: {
  onEdit: (restaurant: Restaurant) => void;
}): TableColumn<Restaurant>[] => [
  {
    key: 'name',
    header: 'RESTAURANT NAME',
    type: 'text',
    textConfig: { bold: true },
  },
  {
    key: 'address',
    header: 'ADDRESS',
    type: 'text',
  },
  {
    key: 'ownersEmail',
    header: 'OWNERS',
    type: 'chip',
    chipConfig: {
      multiple: true,
      color: 'primary',
    },
  },
  {
    key: 'actions',
    header: 'ACTIONS',
    type: 'button',
    buttonConfig: [
      {
        type: 'stroked',
        label: 'Edit',
        icon: 'edit',
        color: 'primary',
        handler: handlers.onEdit,
      },
    ],
  },
];
