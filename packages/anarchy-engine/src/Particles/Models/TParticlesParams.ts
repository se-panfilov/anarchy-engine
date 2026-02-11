import type { TAnyMaterialWrapper } from '@Anarchy/Engine/Material';
import type { TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TObject3DParams } from '@Anarchy/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@Anarchy/Engine/TransformDrive';

export type TParticlesParams = Readonly<{
  material: TAnyMaterialWrapper;
}> &
  TWithTransformAgentParam &
  TWithName &
  TObject3DParams &
  TWithTags;
