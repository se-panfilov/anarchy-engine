import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { WrappedInput } from './Models/WrappedInput';

export function InputWrapper(): WrappedInput {
  let input = new Input();
  const destroyed$ = new Subject<void>();

  function destroy() {
    input = undefined as any;
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `input_wrapper_${nanoid()}`, input, destroy, destroyed$ };
}
