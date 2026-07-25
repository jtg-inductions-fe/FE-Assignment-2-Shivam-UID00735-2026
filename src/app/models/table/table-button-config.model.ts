import { ThemePalette } from '@angular/material/core';

export type ButtonType =
  'basic' | 'flat' | 'stroked' | 'raised' | 'icon' | 'fab' | 'mini-fab';

export interface ButtonConfig {
  type: ButtonType;

  action: string;

  label?: string;

  icon?: string;

  color?: ThemePalette;

  disabled?: boolean;

  tooltip?: string;
}
