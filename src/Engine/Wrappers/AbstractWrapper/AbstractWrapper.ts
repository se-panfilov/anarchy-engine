import type { IWrapper } from '@Engine/Models';
import { cleanObject } from '@Engine/Utils';
import { nanoid } from 'nanoid';

export function AbstractWrapper<T>(entity: T, { tags }: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = nanoid();

  const wrapper = {
    id,
    entity,
    tags,
    destroy
  };

  // TODO (S.Panfilov) destroy() should be tested before released
  function destroy(): void {
    console.error('Develop: At the moment .destroy() does nothing (not implemented)');
    cleanObject(wrapper);
  }

  return wrapper;
}
