import { nanoid } from 'nanoid';

import type { WrapperType } from '@/Engine/Domains/Abstract';
import type { IWrapper } from '@/Engine/Domains/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';
import { isDefined } from '@/Engine/Utils';

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = type + '_' + nanoid();

  if (isDefined((entity as any).name)) {
    // TODO (S.Panfilov) log somehow
    if ((entity as any).name !== '' || typeof (entity as any).name !== 'string') console.warn('Entity name is not empty or not a string: ', (entity as any).name);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (entity as any).name = id;
  }

  return {
    id,
    entity,
    ...withTags(params ? params.tags : []),
    ...destroyableMixin()
  };
}
