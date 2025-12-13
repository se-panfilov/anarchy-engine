import { isDefined } from '@Anarchy/Shared/Utils';
import type { ErrorEvent, Primitive } from '@sentry/core';

export function mutateEventWithDynamicData(result: ErrorEvent, dynamicContextFn?: () => Record<string, any>, dynamicTagsFn?: () => Record<string, Primitive>): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(dynamicContextFn)) result.contexts = { ...(result.contexts ?? {}), extra: dynamicContextFn() };
  if (isDefined(dynamicTagsFn)) {
    const dynamicTags = dynamicTagsFn();
    // eslint-disable-next-line functional/immutable-data
    Object.keys(dynamicTags).forEach((key: string): void => void (result.tags = { ...(result.tags ?? {}), [key]: dynamicTags[key] }));
  }
}
