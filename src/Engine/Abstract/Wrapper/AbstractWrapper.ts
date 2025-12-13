import { nanoid } from 'nanoid';

import type { IWithUserData, IWithWrapperIdEntity, WrapperType } from '@/Engine/Abstract';
import { withWrapperId } from '@/Engine/Abstract';
import type { IWrapper } from '@/Engine/Abstract/Models';
import type { IWithName, IWithNameAndNameAccessors } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic';
import { isDefined, isWithUserData, IWithWrapperIdAccessors } from '@/Engine/Utils';

type IWrapperParams = Readonly<{ tags: ReadonlyArray<string> } & IWithName>;

export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: IWrapperParams): IWrapper<T>;
export function AbstractWrapper<T extends IWithUserData>(entity: T, type: WrapperType | string, params?: IWrapperParams): IWrapper<IWithWrapperIdEntity<T>>;
export function AbstractWrapper<T>(entity: T, type: WrapperType | string, params?: IWrapperParams): IWrapper<IWithWrapperIdEntity<any>> | IWrapper<T> {
  const id: string = type + '_' + nanoid();

  let result = {
    id,
    entity,
    ...withTags(params ? params.tags : []),
    ...destroyableMixin()
  };

  if (isWithUserData(entity)) {
    result = { ...result, ...withWrapperId(entity) };

    if (IWithWrapperIdAccessors(result)) {
      result.setWrapperId(id);
    }
  }

  // TODO (S.Panfilov) test that it's actually modify the final wrapper
  const withNameAndNameAccessors: IWithNameAndNameAccessors = {
    name: undefined,
    getName: () => (result as unknown as IWithNameAndNameAccessors).name,
    // eslint-disable-next-line functional/immutable-data
    setName: (name: string) => ((result as unknown as IWithNameAndNameAccessors).name = name)
  };

  if (isDefined(params?.name)) {
    withNameAndNameAccessors.setName(params.name);
  }

  result = { ...result, ...withNameAndNameAccessors };

  return result as IWrapper<T>;
}
