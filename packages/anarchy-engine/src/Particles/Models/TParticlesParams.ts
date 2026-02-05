import type { TAnyMaterialWrapper } from '@hellpig/anarchy-engine/Material';
import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TObject3DParams } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWithTransformAgentParam } from '@hellpig/anarchy-engine/TransformDrive';

export type TParticlesParams = Readonly<{
  material: TAnyMaterialWrapper;
}> &
  TWithTransformAgentParam &
  TWithName &
  TObject3DParams &
  TWithTags;
