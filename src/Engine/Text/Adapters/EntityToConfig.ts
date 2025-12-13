import type { TTextAnyWrapper, TTextConfig } from '@/Engine/Text/Models';

export function entityToConfig(entity: TTextAnyWrapper): TTextConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement
  // TODO 15-0-0: Check if we need distinct adapters for each type of text

  return {
    ...drive.serialize()
    // TODO 15-0-0: fix any
  } as any;
}
