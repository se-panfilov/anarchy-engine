import { nanoid } from 'nanoid';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { WrapperType } from '@/Engine/Domains/Abstract';

import type { IWrapper } from '../Models';

export function AbstractWrapper<T>(entity: T, type: string, params?: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = type + '_' + nanoid();
  let isInternalChange: boolean = true;
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  destroyed$.subscribe((val: boolean): void => {
    if (!isInternalChange) throw new Error(`Wrapper ("${type}") doesn't allow to modify "destroyed$" from outside. Attempt to set value: ${String(val)}`);
    isInternalChange = false;
  });

  const wrapper: IWrapper<T> = {} as IWrapper<T>;

  function destroy(): void {
    isInternalChange = true;
    destroyed$.next(true);
    destroyed$.unsubscribe();
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
    get destroyed$(): Observable<boolean> {
      return destroyed$.asObservable();
    },
    isDestroyed: (): boolean => destroyed$.getValue()
  };
}
