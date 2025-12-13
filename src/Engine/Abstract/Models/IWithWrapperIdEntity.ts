export type IWithWrapperIdEntity<T> = Omit<T, 'userData'> & Readonly<{ userData: { wrapperId: string } }>;
