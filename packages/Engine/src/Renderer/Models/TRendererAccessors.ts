import type { TThreeJsRendererParamsAccessors } from './TThreeJsRendererParamsAccessors';
import type { TThreeJsRendererPropsAccessors } from './TThreeJsRendererPropsAccessors';

export type TRendererAccessors = TThreeJsRendererParamsAccessors &
  TThreeJsRendererPropsAccessors &
  Readonly<{
    setSize: (width: number, height: number) => void;
    setPixelRatio: (ratio: number, maxPixelRatio: number) => void;
  }>;
