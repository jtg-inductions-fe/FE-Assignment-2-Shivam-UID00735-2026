import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonConfig } from '@/models';

@Component({
  selector: 'app-table-button-cell',
  templateUrl: './table-button-cell.component.html',
  styleUrls: ['./table-button-cell.component.scss'],
})
export class TableButtonCellComponent {
  @Input() config: ButtonConfig[] = [];

  @Input() row: unknown;

  @Output() buttonClick = new EventEmitter<{
    action: string;
    row: unknown;
  }>();

  onClick(button: ButtonConfig): void {
    this.buttonClick.emit({
      action: button.action,
      row: this.row,
    });
  }
}
