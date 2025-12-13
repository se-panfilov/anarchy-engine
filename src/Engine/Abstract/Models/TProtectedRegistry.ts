export type TProtectedRegistry<T extends { registry: Map<string, any> }> = Readonly<Omit<T, 'registry'>>;
