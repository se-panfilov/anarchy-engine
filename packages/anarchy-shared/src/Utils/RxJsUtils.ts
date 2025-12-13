import type { Observable } from 'rxjs';
import { isObservable, of } from 'rxjs';

export const toObservable$ = <T>(x: T | Observable<T>): Observable<T> => (isObservable(x) ? x : of(x));
