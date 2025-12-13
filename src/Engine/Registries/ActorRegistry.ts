import { AbstractRegistry } from './AbstractRegistry';
import type { ActorWrapper } from '@Engine/Wrappers';

export const ActorRegistry = (): ReturnType<typeof AbstractRegistry<ReturnType<typeof ActorWrapper>>> =>
  AbstractRegistry();
