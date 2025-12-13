import { nanoid } from 'nanoid';
import type { Observable } from 'rxjs';
import { BehaviorSubject, filter, map } from 'rxjs';

import type { WrapperType } from '@/Engine/Domains/Abstract';

import type { IWrapper } from '../Models';

export function AbstractWrapper<T>(entity: T, type: string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = type + '_' + nanoid();
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  const wrapper: IWrapper<T> = {} as IWrapper<T>;

  function destroy(): void {
    destroyed$.next(true);
    destroyed$.complete();
  }

  return {
    ...wrapper,
    get id(): string {
      return id;
    },
    get type(): WrapperType | string {
      return type;
    },
    entity,
    tags: params?.tags ?? [],
    isRegistrable: true,
    destroy,
    isDestroyed: (): boolean => destroyed$.getValue(),
    get destroyed$(): Observable<void> {
      return destroyed$.pipe(
        filter((v: boolean): boolean => !!v),
        map(() => undefined)
      );
    }
  };
}
