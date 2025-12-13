import type { TWithUserData } from './TWithUserData';

export type TWithWrapperIdEntity<T extends TWithUserData> = Omit<T, 'userData'> & Readonly<{ userData: { wrapperId: string } }>;
