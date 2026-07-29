import { BaseColumn } from './table-base-column.model';
import { ChipConfig } from './table-chip-config.model';

export interface ChipColumn<T> extends BaseColumn<keyof T & string> {
  type: 'chip';
  chipConfig: ChipConfig;
}
