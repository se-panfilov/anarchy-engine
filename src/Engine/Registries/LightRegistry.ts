import { AbstractRegistry } from './AbstractRegistry';
import type { LightWrapper } from '@Engine/Wrappers';

export const LightRegistry = (): ReturnType<typeof AbstractRegistry<ReturnType<typeof LightWrapper>>> =>
  AbstractRegistry();
