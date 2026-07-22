import { Component, Input } from '@angular/core';
import { StatsCard } from '@/models/dashboard-stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input() StatsCards!: StatsCard[];
}
