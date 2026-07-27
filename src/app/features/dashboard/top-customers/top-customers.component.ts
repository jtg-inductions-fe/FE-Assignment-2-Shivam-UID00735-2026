import { Component, Input, OnInit } from '@angular/core';
import { ListCardItem } from '@/models/listcard-item.model';

@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.scss'],
})
export class TopCustomersComponent {
  heading = '';
  @Input() customers: ListCardItem[] = [];
}
