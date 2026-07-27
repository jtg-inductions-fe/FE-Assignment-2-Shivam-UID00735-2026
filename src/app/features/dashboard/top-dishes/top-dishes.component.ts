import { Component, Input } from '@angular/core';
import { ListCardItem } from '@/models/listcard-item.model';
@Component({
  selector: 'app-top-dishes',
  templateUrl: './top-dishes.component.html',
  styleUrls: ['./top-dishes.component.scss'],
})
export class TopDishesComponent {
  heading = '';
  @Input() topDishes: ListCardItem[] = [];
}
