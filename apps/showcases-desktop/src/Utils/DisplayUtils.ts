import type { Display, Size } from 'electron';
import { screen } from 'electron';

export function getDisplayInfo(display: Display = screen.getPrimaryDisplay()): Readonly<{ width: number; height: number; dpi: number }> {
  const workArea: Size = display.workAreaSize;

  return {
    width: workArea.width,
    height: workArea.height,
    dpi: display.scaleFactor
  };
}
