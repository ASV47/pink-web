import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  map,
  merge,
  timer,
  switchMap,
  of,
  catchError,
  distinctUntilChanged,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Network {
  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  online$ = this.onlineSubject.asObservable();

  constructor(private http: HttpClient) {
    merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).subscribe((status) => this.onlineSubject.next(status));

    timer(0, 5000)
      .pipe(
        switchMap(() =>
          this.http.get('ping.json').pipe(
            map(() => true),
            catchError(() => of(false))
          )
        ),
        distinctUntilChanged()
      )
      .subscribe((status) => this.onlineSubject.next(status));
  }

  isOnline(): boolean {
    return this.onlineSubject.value;
  }
}
