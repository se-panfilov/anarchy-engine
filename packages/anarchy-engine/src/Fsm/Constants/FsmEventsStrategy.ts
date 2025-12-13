export enum FsmEventsStrategy {
  //concatMap: Guaranteed execution in the order of arrival
  StrictQueue = 'strict_queue',
  //exhaustMap: Ignore new calls if the previous one is not completed
  SkipPending = 'skip_pending',
  //switchMap: Cancel previous call if a new one comes in
  ReplacePending = 'replace_pending',
  //mergeMap: Launch all calls in parallel
  RunParallel = 'run_parallel'
}
