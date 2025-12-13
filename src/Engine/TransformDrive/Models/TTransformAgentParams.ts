import type { TReadonlyTransform } from './TReadonlyTransform';
import type { TTransformAgentPerformanceParams } from './TTransformAgentPerformanceParams';

export type TTransformAgentParams = TReadonlyTransform &
  Readonly<{
    onActivated?: (transform: TReadonlyTransform) => void;
    onDeactivated?: (transform: TReadonlyTransform) => void;
    enabled?: boolean;
    performance?: TTransformAgentPerformanceParams;
  }>;
