import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TTextProps } from '@/Engine/Text/Models';
import type { TObject3DParams } from '@/Engine/ThreeLib';

export type TTextParams = TTextProps &
  Readonly<{
    physics?: TWithPresetNamePhysicsBodyParams;
  }> &
  TObject3DParams &
  TWithReadonlyTags;
