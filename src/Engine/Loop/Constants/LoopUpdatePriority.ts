export enum LoopUpdatePriority {
  ASAP = 5, //e.g. fast bullets
  HIGH = 4, // e.g. slow bullets (rockets, etc), or vehicles
  MEDIUM = 3, // e.g. player & NPCs
  LOW = 2, // e.g. slow background objects
  IDLE = 1, // e.g. things that should not have collisions, but just to be on a safe side we check them lazelly
  NEVER = 0 // e.g. background objects without collisions
}
