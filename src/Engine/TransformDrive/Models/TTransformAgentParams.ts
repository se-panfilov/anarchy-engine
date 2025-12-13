import type { TReadonlyTransform } from './TReadonlyTransform';

export type TTransformAgentParams = TReadonlyTransform &
  Readonly<{
    onActivated?: () => void;
    onDeactivated?: () => void;
    enabled?: boolean;
  }>;
