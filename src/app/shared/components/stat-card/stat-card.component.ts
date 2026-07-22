import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() title!: string;
  @Input() stat!: string | number;
  @Input() icon!: string;
  @Input() iconBg!: string;
  @Input() iconColor!: string;
  @Input() isCurrency = false;
}
