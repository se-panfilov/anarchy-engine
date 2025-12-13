import type { TPhysicalLoop } from '@/Engine/Physics';

export type TPhysicalWorldServiceDependencies = Readonly<{
  physicalLoop: TPhysicalLoop;
}>;
