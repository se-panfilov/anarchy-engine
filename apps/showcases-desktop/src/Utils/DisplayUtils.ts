import type { TResolution } from '@Showcases/Shared';
import type { Display, Size } from 'electron';
import { screen } from 'electron';

export function detectResolution(): TResolution {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.size;
  return { width, height };
}

export function getScreenRatio(): number {
  const { width, height }: TResolution = detectResolution();
  return width / height;
}

export function getDisplayInfo(display: Display = screen.getPrimaryDisplay()): Readonly<{ width: number; height: number; dpi: number }> {
  const workArea: Size = display.workAreaSize;

  return {
    width: workArea.width,
    height: workArea.height,
    dpi: display.scaleFactor
  };
}
