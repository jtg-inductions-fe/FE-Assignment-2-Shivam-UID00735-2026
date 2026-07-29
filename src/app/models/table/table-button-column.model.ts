import { BaseColumn } from './table-base-column.model';
import { ButtonConfig } from './table-button-config.model';

export interface ButtonColumn<T> extends BaseColumn<string> {
  type: 'button';
  buttonConfig: ButtonConfig<T>[];
}
