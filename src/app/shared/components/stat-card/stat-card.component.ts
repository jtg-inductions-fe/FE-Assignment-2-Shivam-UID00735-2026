import { Component, Input } from '@angular/core';
import { StatCardVariant } from '@/models/dashboard-stats.model';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() title = '';
  @Input() stat: number | string = '';
  @Input() icon = '';
  @Input() isCurrency = false;
  @Input() variant: StatCardVariant = 'primary';
}
