import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../Core/Services/Toaster/toaster';
import { Network } from '../../../Core/Services/PWA/network';
import { Update } from '../../../Core/Services/PWA/update';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit {
  isOnline: boolean = true;
  // showUpdatePrompt: boolean = false;
  updateAvailable$!: Observable<boolean>;

  constructor(
    private networkService: Network,
    private updateService: Update,
    public toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.networkService.online$.subscribe((status) => {
      this.isOnline = status;
      this.updateAvailable$ = this.updateService.updateAvailable$;

      if (status) {
        this.showNotification('تم الاتصال بالإنترنت ', 'success');
      } else {
        this.showNotification('غير متصل بالأنترنت', 'warning');
      }
    });

    this.networkService.online$.subscribe((s) => {
      console.log('ONLINE?', s);
    });

    // this.updateService.updateAvailable$.subscribe((available) => {
    //   if (available) {
    //     this.showUpdatePrompt = true;
    //   }
    // });
  }
  applyUpdate() {
    this.updateService.applyUpdate();
  }

  dismissUpdate() {
    // this.showUpdatePrompt = false;
  }

  private showNotification(message: string, type: 'success' | 'warning') {
    if (type === 'success') {
      this.toastService.success(message);
    } else if (type === 'warning') {
      this.toastService.warning(message);
    }
  }
}
