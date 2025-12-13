export enum SpatialUpdatePriority {
  ASAP = 5, //e.g. fast bullets
  HIGH = 4, // e.g. slow bullets
  MEDIUM = 3, // e.g. player & NPCs
  LOW = 2, // e.g. slow background objects
  IDLE = 1, // e.g. things that should not leave spatial grid, but just to be on a safe side we check them sometimes
  NEVER = 0 // e.g. static objects (buildings, etc.)
}
