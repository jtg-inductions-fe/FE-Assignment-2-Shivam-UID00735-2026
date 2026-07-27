import { Component, Input } from '@angular/core';
import { ListCardItem } from '@/models';
@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {
  @Input() title = '';
  @Input({ required: true }) items: ListCardItem[] = [];
  @Input() valueSuffix = '';
  @Input() valuePrefix = '';
}
