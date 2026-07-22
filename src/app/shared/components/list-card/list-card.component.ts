import { Component, Input } from '@angular/core';
import { ListCardItem } from '@/models/listcard-item.model';
@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {
  @Input() title = '';
  @Input() items: ListCardItem[] = [];
}
