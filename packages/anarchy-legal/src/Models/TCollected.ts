export type TCollected = Readonly<{
  id: string; // name@version
  name: string;
  version: string;
  installPath?: string; // absolute path in node_modules
}>;
