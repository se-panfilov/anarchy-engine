import type { IWithUserData } from './IWithUserData';

export type IWithWrapperIdEntity<T extends IWithUserData> = Omit<T, 'userData'> & Readonly<{ userData: { wrapperId: string } }>;
