import { ThemePalette } from '@angular/material/core';

export type ButtonType = 'basic' | 'flat' | 'stroked' | 'raised';

export interface ButtonConfig<T = unknown> {
  type: ButtonType;
  handler: (row: T) => void;
  label?: string;
  icon?: string;
  color?: ThemePalette;
  disabled?: boolean;
}
