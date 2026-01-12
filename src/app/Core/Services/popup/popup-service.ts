import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type PopupType = 'login' |'signup'| 'cart' | 'search' | 'wishlist' | 'preview' | null;

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupsubject = new BehaviorSubject<PopupType>(null);
  popup$ = this.popupsubject.asObservable();

  open(type: PopupType) {
    this.popupsubject.next(type);
  }
  close() {
    this.popupsubject.next(null);
  }
}
