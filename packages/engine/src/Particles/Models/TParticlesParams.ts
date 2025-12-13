import type { TAnyMaterialWrapper } from '@/Material';
import type { TWithName, TWithTags } from '@/Mixins';
import type { TObject3DParams } from '@/ThreeLib';
import type { TWithTransformAgentParam } from '@/TransformDrive';

export type TParticlesParams = Readonly<{
  material: TAnyMaterialWrapper;
}> &
  TWithTransformAgentParam &
  TWithName &
  TObject3DParams &
  TWithTags;
