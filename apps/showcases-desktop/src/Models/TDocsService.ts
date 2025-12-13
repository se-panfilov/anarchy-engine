import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';

export type TDocsService = Readonly<{
  get: (payload: TLoadDocPayload) => Promise<TLegalDoc>;
}>;
