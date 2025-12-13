import type { IThreeJsRendererParamsAccessors } from './IThreeJsRendererParamsAccessors';
import type { IThreeJsRendererPropsAccessors } from './IThreeJsRendererPropsAccessors';

export type IRendererAccessors = IThreeJsRendererParamsAccessors &
  IThreeJsRendererPropsAccessors &
  Readonly<{
    setSize: (width: number, height: number) => void;
    setPixelRatio: (ratio: number, maxPixelRatio: number) => void;
  }>;
