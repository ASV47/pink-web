// src/app/services/pwa.service.ts
import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';
import { fromEvent, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  isOnline$: Observable<boolean>;

  constructor(private swUpdate: SwUpdate) {
    // مراقبة حالة الاتصال
    this.isOnline$ = merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );
  }

  // التحقق من التحديثات
  checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      // فحص التحديثات كل 6 ساعات
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 6 * 60 * 60 * 1000);

      // الاستماع للتحديثات الجديدة
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          this.promptUser();
        });
    }
  }

  // سؤال المستخدم عن التحديث
  private promptUser() {
    const message = 'يوجد تحديث جديد لتطبيق HiPink! هل تريد التحديث الآن؟';

    if (confirm(message)) {
      this.updateApp();
    }
  }

  // تحديث التطبيق
  updateApp() {
    this.swUpdate.activateUpdate().then(() => {
      document.location.reload();
    });
  }

  // التحقق من حالة الاتصال
  isOnline(): boolean {
    return navigator.onLine;
  }

  // فحص التحديثات يدويًا
  manualCheckForUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then((updateAvailable) => {
        if (updateAvailable) {
          this.promptUser();
        } else {
          alert('أنت تستخدم أحدث إصدار من التطبيق');
        }
      });
    }
  }
}
