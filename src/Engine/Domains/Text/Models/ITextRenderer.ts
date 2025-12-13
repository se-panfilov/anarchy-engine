import type { IScreenSizeValues } from '@/Engine/Domains/Screen';

export type ITextRenderer<T> = {
  renderer: T;
  destroy: () => void;
  updateSize: (size: IScreenSizeValues) => void;
};
