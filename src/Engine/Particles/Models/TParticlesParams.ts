import type { TMaterialWrapper } from '@/Engine/Material';
import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

export type TParticlesParams = Readonly<{
  materialSource: TMaterialWrapper;
}> &
  TWithTransformAgentParam &
  TWithName &
  TObject3DParams &
  TWithReadonlyTags;
