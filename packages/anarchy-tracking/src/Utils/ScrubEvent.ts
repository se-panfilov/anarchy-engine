import { HiddenField } from '@Anarchy/Tracking/Constants';
import type { ErrorEvent } from '@sentry/core';

export function scrubEvent(event: ErrorEvent): ErrorEvent {
  // eslint-disable-next-line functional/immutable-data
  if (!event.user) event.user = null as any;

  if (event.request) {
    // eslint-disable-next-line functional/immutable-data
    event.request = {
      ...event.request,
      url: HiddenField,
      headers: {
        ...event.request?.headers,
        url: HiddenField,
        Referer: HiddenField,
        referer: HiddenField
      }
    };

    delete (event.request.headers as any)?.Cookie;
    delete (event.request.headers as any)?.cookie;
  }

  // eslint-disable-next-line functional/immutable-data
  if ((event as any).contexts?.geo) delete (event as any).contexts.geo;
  // eslint-disable-next-line functional/immutable-data
  if ((event as any).contexts?.Geography) delete (event as any).contexts.Geography;
  // eslint-disable-next-line functional/immutable-data
  if ((event as any).contexts?.geography) delete (event as any).contexts.geography;

  // eslint-disable-next-line functional/immutable-data
  if (!event.breadcrumbs) event.breadcrumbs = undefined;

  return event;
}
