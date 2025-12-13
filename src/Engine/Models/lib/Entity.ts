import { Subject } from 'rxjs';

export interface Entity {
  readonly id: string;
  readonly destroy: () => void;
  readonly destroyed$: Subject<void>;
}
