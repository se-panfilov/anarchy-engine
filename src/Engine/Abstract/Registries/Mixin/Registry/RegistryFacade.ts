export function RegistryFacade<T, R extends { registry: Map<string, T> }>(abstractRegistry: R): Omit<R, 'registry'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registry, ...rest } = abstractRegistry;
  return rest;
}
