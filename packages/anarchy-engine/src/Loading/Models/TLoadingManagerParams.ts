import type { TWithName, TWithTags } from '@Anarchy/Engine/Mixins';

export type TLoadingManagerParams = Readonly<{
  onLoad?: () => void;
  onProgress?: (url: string, loaded: number, total: number) => void;
  onError?: (url: string) => void;
}> &
  TWithName &
  TWithTags;
