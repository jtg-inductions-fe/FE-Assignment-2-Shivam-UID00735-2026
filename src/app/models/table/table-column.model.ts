import { ButtonConfig } from './table-button-config.model';
import { ChipConfig } from './table-chip-config.model';
import { TextConfig } from './table-text-config.model';

export type TableColumn<T = unknown> =
  | {
      key: keyof T & string;
      header: string;
      type: 'text';
      textConfig?: TextConfig;
    }
  | {
      key: keyof T & string;
      header: string;
      type: 'chip';
      chipConfig: ChipConfig;
    }
  | {
      key: string;
      header: string;
      type: 'button';
      buttonConfig: ButtonConfig<T>[];
    };
