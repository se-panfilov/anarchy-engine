import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';

export type TDocsService = Readonly<{
  load: (payload: TLoadDocPayload) => Promise<TLegalDoc> | never;
}>;
