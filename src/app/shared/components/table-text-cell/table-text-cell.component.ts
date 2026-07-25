import { Component, Input } from '@angular/core';
import { TextConfig } from '@/models';

@Component({
  selector: 'app-table-text-cell',
  templateUrl: './table-text-cell.component.html',
  styleUrls: ['./table-text-cell.component.scss'],
})
export class TableTextCellComponent {
  @Input() value!: unknown;
  @Input() config?: TextConfig;
}
