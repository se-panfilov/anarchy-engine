import type { TMaterialWrapper } from '@/Engine/Material';
import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

export type TParticlesParams = Readonly<{
  material: TMaterialWrapper;
}> &
  TWithTransformAgentParam &
  TWithName &
  TObject3DParams &
  TWithTags;
