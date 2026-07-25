import { ButtonConfig } from './table-button-config.model';
import { ChipConfig } from './table-chip-config.model';
export interface TextConfig {
  bold?: boolean;
}

export type TableColumnType = 'text' | 'chip' | 'button';

export interface TableColumn {
  key: string;
  header: string;
  type?: TableColumnType;

  textConfig?: TextConfig;

  chipConfig?: ChipConfig;

  buttonConfig?: ButtonConfig[];
}
