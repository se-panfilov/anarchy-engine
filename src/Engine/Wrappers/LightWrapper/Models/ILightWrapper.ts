import type { AbstractWrapper } from '@Engine/Wrappers';
import type { AmbientLight, DirectionalLight } from 'three';
import type { getAccessors } from '../Accessors';

export type ILightWrapper = ReturnType<typeof AbstractWrapper<AmbientLight | DirectionalLight>> &
  ReturnType<typeof getAccessors>;
