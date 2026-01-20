import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IDataTableRequest, SortDir } from '../../../Core/Models/Shoplift/IDataTableRequest';
import { IContactInfo } from '../../../Core/Models/ContactUs/IContactInfo';
import { ContactUsApiService } from '../../../Core/Services/ContactUs/contact-us-api-service';
import { IDataTableResponse } from '../../../Core/Models/Shoplift/IData-table-response';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMessageApiService } from '../../../Core/Services/ContactUs/contact-message-api-service';
import { IContactMessageCreateRequest } from '../../../Core/Models/ContactUs/icontact-message-create-request';

@Component({
  selector: 'app-contact',
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  // ! Initilization Message and info
  sending = signal(false);
  sendSuccessMsg = signal<string | null>(null);
  sendErrorMsg = signal<string | null>(null);

  private draw = 1;
  start = signal(0);
  length = signal(10);
  form!: FormGroup;

  sortColumnName = signal<string>('Name');
  sortColumnDirection = signal<SortDir>('asc');

  searchValue = signal('');
  rows = signal<IContactInfo[]>([]);
  mainContact = computed(() => (this.rows().length ? this.rows()[0] : null));

  recordsTotal = signal(0);
  recordsFiltered = signal(0);

  loading = signal(false);
  err = signal<string | null>(null);

  pageNumber = computed(() => Math.floor(this.start() / this.length()) + 1);
  canPrev = computed(() => this.start() > 0);
  canNext = computed(() => this.start() + this.length() < this.recordsFiltered());

  constructor(
    private contactInfoApi: ContactUsApiService,
    private contactMessageApi: ContactMessageApiService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      website: [''],
      subject: ['Contact Form'],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit(): void {
    this.loadContact();
  }

  loadContact() {
    this.loading.set(true);
    this.err.set(null);
    const request: IDataTableRequest = {
      draw: this.draw++,
      start: this.start(),
      length: this.length(),
      sortColumnName: this.sortColumnName(),
      sortColumnDirection: this.sortColumnDirection(),
      searchValue: this.searchValue(),
      searchableCloumnsValues: {},
      searchableCloumns: ['Name'],
    };
    this.contactInfoApi.getContactInfo(request).subscribe({
      next: (res: IDataTableResponse<IContactInfo>) => {
        this.rows.set(res.data ?? []);
        this.recordsTotal.set(res.recordsTotal ?? 0);
        this.recordsFiltered.set(res.recordsFiltered ?? 0);
        this.loading.set(false);
        console.log(res);
      },
      error: (err) => {
        this.loading.set(false);
        this.err.set(err?.message ?? 'Something went wrong');
      },
    });
  }
  submitMessage(): void {
    this.sendSuccessMsg.set(null);
    this.sendErrorMsg.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sendErrorMsg.set('Please fill required fields correctly.');
      return;
    }

    this.sending.set(true);

    const v = this.form.getRawValue();

    const payload: IContactMessageCreateRequest = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      subject: v.subject,
      message: v.message,
      source: 1,
      status: 0,
      assignedToUserId: null,
    };

    this.contactMessageApi.createContactMessage(payload).subscribe({
      next: (res) => {
        this.sending.set(false);

        if (res?.isSuccess) {
          this.sendSuccessMsg.set(res.message ?? 'تم الإرسال بنجاح');

          this.form.reset({
            name: '',
            email: '',
            phone: '',
            website: '',
            subject: 'Contact Form',
            message: '',
          });
        } else {
          // لو الباك بيرجع errors array زي schema
          const errs = res?.errors as any;

          if (Array.isArray(errs) && errs.length) {
            const msg = errs.map((e: any) => `${e.field}: ${e.message}`).join(' | ');
            this.sendErrorMsg.set(msg);
          } else {
            this.sendErrorMsg.set(res?.message ?? 'فشل الإرسال');
          }
        }
      },

      error: (err) => {
        this.sending.set(false);
        const msg = err?.error?.message ?? err?.message ?? 'فشل الإرسال';
        this.sendErrorMsg.set(msg);
      },
    });
  }

  //! pagination
  next(): void {
    if (!this.canNext()) return;
    this.start.set(this.start() + this.length());
    this.loadContact();
  }

  prev(): void {
    if (!this.canPrev()) return;
    this.start.set(Math.max(0, this.start() - this.length()));
    this.loadContact();
  }

  changeLength(newLen: number): void {
    this.length.set(Number(newLen));
    this.start.set(0);
    this.loadContact();
  }

  applySearch(): void {
    this.start.set(0);
    this.loadContact();
  }

  clearSearch(): void {
    this.searchValue.set('');
    this.start.set(0);
    this.loadContact();
  }

  sortBy(column: string): void {
    if (this.sortColumnName() === column) {
      this.sortColumnDirection.set(this.sortColumnDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumnName.set(column);
      this.sortColumnDirection.set('asc');
    }
    this.loadContact();
  }

  normalizeWhatsApp(phone: string): string {
    return (phone ?? '').toString().replace(/[^\d]/g, '');
  }
}
