import { Component, Input } from '@angular/core';

import { ChipConfig } from '@/models';

@Component({
  selector: 'app-table-chip-cell',
  templateUrl: './table-chip-cell.component.html',
  styleUrls: ['./table-chip-cell.component.scss'],
})
export class TableChipCellComponent {
  @Input() value!: string | string[];

  @Input() config!: ChipConfig;

  get chips(): string[] {
    return Array.isArray(this.value) ? this.value : [];
  }

  get chip(): string {
    return Array.isArray(this.value) ? '' : this.value;
  }

  getChipColor(value: string) {
    return this.config.colorMap?.[value] || this.config.color;
  }
}
