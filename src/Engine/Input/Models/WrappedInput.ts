import type { Entity } from '@/Engine/Models';

export interface WrappedInput extends Entity {
  readonly input: unknown;
}
