import type { TLoadDocPayload } from './TLoadDocPayload';

export type TDocsService = Readonly<{
  load: (payload: TLoadDocPayload) => Promise<string> | never;
}>;
