export type IProtectedRegistry<T extends { registry: Map<string, any> }> = Readonly<Omit<T, 'registry'>>;
