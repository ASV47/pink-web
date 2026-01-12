import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Update {
  private updateAvailableSubject = new BehaviorSubject<boolean>(false);
  public updateAvailable$ = this.updateAvailableSubject.asObservable();

  constructor(private swUpdate: SwUpdate) {
    this.checkForUpdates();
  }

  private checkForUpdates() {
    if (!this.swUpdate.isEnabled) {
      console.log('Service Worker غير مفعل');
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        console.log('تحديث جديد متاح!');
        this.updateAvailableSubject.next(true);
      });

    setInterval(() => {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('تم فحص التحديثات');
      });
    }, 60 * 1000);
  }

  applyUpdate() {
    if (this.swUpdate.isEnabled) {
      window.location.reload();
    }
  }

  checkNow() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
    }
  }
}
