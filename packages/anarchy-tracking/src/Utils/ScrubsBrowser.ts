import { HiddenField } from '@Anarchy/Tracking/Constants';
import type { ErrorEvent } from '@sentry/browser';

const pathRegexps: ReadonlyArray<[RegExp, string]> = [
  // macOS: /Users/<name>/...
  [/(\/Users)\/[^/]+/g, '$1/<home>'],

  // Linux: /home/<name>/... and  /var/home/<name>/...
  [/(\/home)\/[^/]+/g, '$1/<home>'],
  [/(\/var\/home)\/[^/]+/g, '$1/<home>'],

  // Windows: C:\\Users\\<name>\\... (any drive letter)
  [/([A-Za-z]:\\Users)\\[^\\]+/g, '$1\\<home>'],

  // Old Windows: C:\\Documents and Settings\\<name>\\...
  [/([A-Za-z]:\\Documents and Settings)\\[^\\]+/g, '$1\\<home>'],

  // file:// URLs: file:///Users/<name>/..., file:///home/<name>/..., file://C:/Users/<name>/...
  [/(file:\/\/\/Users)\/[^/]+/g, '$1/<home>'],
  [/(file:\/\/\/home)\/[^/]+/g, '$1/<home>'],
  [/(file:\/\/\/var\/home)\/[^/]+/g, '$1/<home>'],
  [/(file:\/\/[A-Za-z]:\/Users)\/[^/]+/g, '$1/<home>']
];

function replaceUserPaths(s?: unknown, replacement: string = '<home>'): string | unknown {
  if (typeof s !== 'string') return s;
  return pathRegexps.reduce((acc: string, [re, tpl]) => acc.replace(re, tpl.replace('<home>', replacement)), s);
}

export function scrubUserPathsBrowser(event: ErrorEvent): ErrorEvent {
  const replacement = HiddenField;

  const message = event.message ? (replaceUserPaths(event.message, replacement) as string) : event.message;

  const valuesIn = event.exception?.values as ReadonlyArray<any> | undefined;
  const valuesOut = valuesIn?.map((v: any) => {
    const framesIn: ReadonlyArray<any> | undefined = v?.stacktrace?.frames;
    const framesOut = (framesIn as any[] | undefined)?.map((f: any) => ({
      ...f,
      ...(f?.filename ? { filename: replaceUserPaths(f.filename, replacement) } : {}),
      ...(f?.abs_path ? { abs_path: replaceUserPaths(f.abs_path, replacement) } : {}),
      ...(f?.module ? { module: replaceUserPaths(f.module, replacement) } : {}),
      ...(f?.function ? { function: replaceUserPaths(f.function, replacement) } : {})
    }));

    const stacktraceOut = v?.stacktrace ? { ...v.stacktrace, ...(framesOut ? { frames: framesOut } : {}) } : v?.stacktrace;

    return {
      ...v,
      ...(v?.value ? { value: replaceUserPaths(v.value, replacement) } : {}),
      ...(v?.type ? { type: replaceUserPaths(v.type, replacement) } : {}),
      ...(v?.stacktrace ? { stacktrace: stacktraceOut } : {})
    };
  });

  const exceptionOut = event.exception ? { ...event.exception, ...(valuesOut ? { values: valuesOut } : {}) } : event.exception;

  const requestOut = event.request
    ? {
        ...event.request,
        ...(event.request.url ? { url: replaceUserPaths(event.request.url, replacement) as string } : {})
      }
    : event.request;

  const extraIn = event.extra as Record<string, unknown> | undefined;
  const extraOut = extraIn ? Object.fromEntries(Object.entries(extraIn).map(([k, v]) => [k, typeof v === 'string' ? replaceUserPaths(v, replacement) : v])) : extraIn;

  const breadcrumbsIn = event.breadcrumbs as any[] | undefined;
  const breadcrumbsOut = breadcrumbsIn?.map((b: any) => {
    const dataIn = b?.data as Record<string, unknown> | undefined;
    const dataOut = dataIn ? Object.fromEntries(Object.entries(dataIn).map(([key, val]) => [key, typeof val === 'string' ? replaceUserPaths(val as string, replacement) : val])) : dataIn;

    return {
      ...b,
      ...(b?.message ? { message: replaceUserPaths(b.message, replacement) } : {}),
      ...(b?.data && typeof b.data === 'object' ? { data: dataOut } : {})
    };
  });

  return {
    ...event,
    ...(message ? { message } : {}),
    ...(exceptionOut ? { exception: exceptionOut as any } : {}),
    ...(requestOut ? { request: requestOut as any } : {}),
    ...(extraOut !== undefined ? { extra: extraOut as any } : {}),
    ...(breadcrumbsOut ? { breadcrumbs: breadcrumbsOut as any } : {})
  };
}
