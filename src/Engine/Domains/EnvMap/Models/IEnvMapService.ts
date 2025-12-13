export type IEnvMapService = Readonly<{
  load: (url: string) => Promise<void>;
}>;
