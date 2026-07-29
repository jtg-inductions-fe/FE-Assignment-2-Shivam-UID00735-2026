import { BaseColumn } from './table-base-column.model';
import { TextConfig } from './table-text-config.model';

export interface TextColumn<T> extends BaseColumn<keyof T & string> {
  type: 'text';
  textConfig?: TextConfig;
}
