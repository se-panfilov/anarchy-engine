import type { TLoadDocPayload } from '@Showcases/Shared';

export type TDocsService = Readonly<{
  load: (payload: TLoadDocPayload) => Promise<string> | never;
}>;
