import { Subject } from 'rxjs';

export interface Entity {
  readonly id: string;
  readonly entity: unknown | undefined;
  readonly destroy: () => void;
  readonly destroyed$: Subject<void>;
}
