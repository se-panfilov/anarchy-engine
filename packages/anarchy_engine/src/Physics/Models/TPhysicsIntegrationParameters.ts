export type TPhysicsIntegrationParameters = Readonly<{
  dt?: number;
  lengthUnit?: number;
  normalizedAllowedLinearError?: number;
  normalizedPredictionDistance?: number;
  numSolverIterations?: number;
  numAdditionalFrictionIterations?: number;
  // eslint-disable-next-line spellcheck/spell-checker
  numInternalPgsIterations?: number;
  minIslandSize?: number;
  // eslint-disable-next-line spellcheck/spell-checker
  maxCcdSubsteps?: number;
}>;
