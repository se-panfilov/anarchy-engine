import type { IScreenSizeValues } from '@/Engine/Domains/Screen';

export type ITextRenderer = {
  renderer: unknown;
  destroy: () => void;
  updateSize: (size: IScreenSizeValues) => void;
};
