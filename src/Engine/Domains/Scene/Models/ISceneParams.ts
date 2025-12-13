import type { LevelTag } from '@Engine/Domains/Level';

export type ISceneParams = Readonly<{
  name: string;
  tags: ReadonlyArray<LevelTag>;
}>;
