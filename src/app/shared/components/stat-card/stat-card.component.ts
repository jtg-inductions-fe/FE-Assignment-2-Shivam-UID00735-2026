import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) stat!: string | number;
  @Input() icon: string;
  @Input() itemClassName: string;
  @Input() isCurrency = false;
}
