import { clamp } from '@Anarchy/Shared/Utils';
import type { TResolution } from '@Showcases/Shared';
import type { Display, Size } from 'electron';
import { screen } from 'electron';

export function detectResolution(): TResolution {
  const primaryDisplay: Display = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.size;
  return { width, height };
}

export function getScreenRatio(): number {
  const { width, height }: TResolution = detectResolution();
  return width / height;
}

export function getDisplayInfo(display: Display = screen.getPrimaryDisplay()): TResolution & Readonly<{ scaleFactor: number }> {
  const workArea: Size = display.workAreaSize;

  return {
    width: workArea.width,
    height: workArea.height,
    scaleFactor: display.scaleFactor
  };
}

export function getWindowSizeSafe(display: Display = screen.getPrimaryDisplay(), scale: number = 0.88, min: TResolution = { width: 320, height: 200 }): TResolution {
  const { width, height } = getDisplayInfo(display);
  const safeScale = clamp(scale, 0.5, 1.0);

  const targetW: number = Math.floor(width * safeScale);
  const targetH: number = Math.floor(height * safeScale);

  return {
    width: Math.min(width, Math.max(min.width, targetW)),
    height: Math.min(height, Math.max(min.height, targetH))
  };
}
