import { Component, Input } from '@angular/core';
import { ButtonConfig } from '@/models';

@Component({
  selector: 'app-table-button-cell',
  templateUrl: './table-button-cell.component.html',
  styleUrls: ['./table-button-cell.component.scss'],
})
export class TableButtonCellComponent<T = unknown> {
  @Input({ required: true }) row!: T;
  @Input({ required: true }) config!: ButtonConfig<T>[];

  onClick(button: ButtonConfig<T>): void {
    button.handler(this.row);
  }
}
