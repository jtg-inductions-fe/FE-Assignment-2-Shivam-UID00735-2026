import { ButtonColumn } from './table-button-column.model';
import { ChipColumn } from './table-chip-column.model';
import { TextColumn } from './table-text-column.model';

export type TableColumn<T = unknown> =
  TextColumn<T> | ChipColumn<T> | ButtonColumn<T>;
