import type { IWrapper } from '@Engine/Models';
import { nanoid } from 'nanoid';

export function AbstractWrapper<T>(entity: T, { tags }: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = nanoid();

  // TODO (S.Panfilov) destroy() should be tested before released
  function destroy(): void {
    console.error('Develop: At the moment .destroy() does nothing (not implemented)');
    // id = undefined;
    // tags = undefined
    // TODO (S.Panfilov) how to gently destroy entity? Check threejs docs
    // entity = undefined;
  }

  return {
    get id(): string {
      return id;
    },
    get entity(): T {
      return entity;
    },
    tags,
    destroy
  };
}
