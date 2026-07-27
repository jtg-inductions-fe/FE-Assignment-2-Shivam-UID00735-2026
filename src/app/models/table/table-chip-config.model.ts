import { ThemePalette } from '@angular/material/core';

export interface ChipConfig {
  multiple?: boolean;
  color?: ThemePalette;
  colorMap?: Record<string, ThemePalette>;
}
