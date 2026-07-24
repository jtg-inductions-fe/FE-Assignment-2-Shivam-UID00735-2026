import { ActiveOrders } from '@/models';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TableColumn } from '@/models';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.scss'],
})
export class ActiveOrdersComponent implements OnInit {
  @Input() activeOrdersItem: ActiveOrders[] = [];

  activeOrderColumn: TableColumn[] = [
    {
      key: 'orderId',
      header: 'ORDER ID',
    },
    {
      key: 'restaurant',
      header: 'RESTAURANT',
    },
    {
      key: 'customer',
      header: 'CUSTOMER',
    },
    {
      key: 'items',
      header: 'ITEMS',
      type: 'template',
    },
    {
      key: 'amount',
      header: 'AMOUNT',
    },
    {
      key: 'status',
      header: 'STATUS',
      type: 'template',
    },
    {
      key: 'actions',
      header: 'ACTIONS',
      type: 'template',
    },
  ];

  @ViewChild('statusTemplate') statusTemplate: TemplateRef<unknown>;
  @ViewChild('itemsTemplate') itemsTemplate: TemplateRef<unknown>;
  @ViewChild('actionsTemplate') actionsTemplate: TemplateRef<unknown>;

  templates: Record<string, TemplateRef<unknown>> = {};

  ngOnInit(): void {
    this.templates = {
      items: this.itemsTemplate,
      status: this.statusTemplate,
      actions: this.actionsTemplate,
    };
  }
}
