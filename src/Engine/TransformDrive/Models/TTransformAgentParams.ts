import type { TReadonlyTransform } from './TReadonlyTransform';

export type TTransformAgentParams = TReadonlyTransform &
  Readonly<{
    onActivated?: (transform: TReadonlyTransform) => void;
    onDeactivated?: (transform: TReadonlyTransform) => void;
    enabled?: boolean;
  }>;
