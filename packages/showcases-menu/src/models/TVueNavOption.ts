import type { TNavOption } from '@Showcases/Shared';
import type { ShallowRef } from 'vue';

export type TVueNavOption = Omit<TNavOption, 'label'> & {
  label: string | ShallowRef<string>;
};
