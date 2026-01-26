import { Component, computed, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BlogApiService } from '../../../Core/Services/Blog/blog-service';
import { IDataTableRequest, SortDir } from '../../../Core/Models/Shoplift/IDataTableRequest';
import { RouterLink } from '@angular/router';
import { IBlog } from '../../../Core/Models/blog/iblog';
import { CommonModule } from '@angular/common';
import { encodeId } from '../../../Core/utlis/Utlis';
@Component({
  selector: 'app-blog-grid',
  imports: [TranslateModule, RouterLink, CommonModule],
  templateUrl: './blog-grid.html',
  styleUrl: './blog-grid.css',
})
export class BlogGrid implements OnInit {
  private draw = 1;
  start = signal(0);
  length = signal(6);
  items = signal<IBlog[]>([]);
  encodeId = encodeId;
  activeTab = signal<string>('all');

  sortColumnName = signal<string>('Title');
  sortColumnDirection = signal<SortDir>('asc');
  searchValue = signal('');

  recordsTotal = signal(0);
  recordsFiltered = signal(0);

  canPrev = computed(() => this.start() > 0);
  canNext = computed(
    () => this.recordsFiltered() > 0 && this.items().length < this.recordsFiltered(),
  );

  pageNumber = computed(() => Math.floor(this.start() / this.length()) + 1);

  constructor(public blogAPI: BlogApiService) {}
  ngOnInit(): void {
    this.start.set(0);
    this.loadBlogs(false);
  }
  // !Loading Blogs
  loadBlogs(append = false): void {
    const req: IDataTableRequest = {
      draw: this.draw++,
      start: this.start(),
      length: this.length(),
      sortColumnName: this.sortColumnName(),
      sortColumnDirection: this.sortColumnDirection(),
      searchValue: this.searchValue(),
      searchableCloumnsValues: {},
      searchableCloumns: ['title', 'excerpt'],
    };

    this.blogAPI.getDataTablePagination(req).subscribe({
      next: (res) => {
        const newItems = (res.data ?? []) as IBlog[];

        if (append) {
          this.items.update((old) => [...old, ...newItems]);
        } else {
          this.items.set(newItems);
        }

        this.recordsTotal.set(res.recordsTotal ?? 0);
        this.recordsFiltered.set(res.recordsFiltered ?? res.recordsTotal ?? 0);
      },
    });
  }

  // !Pagination
  next(): void {
    if (!this.canNext() || this.blogAPI.isLoading()) return;
    this.start.set(this.start() + this.length());
    this.loadBlogs(true);
  }

  prev(): void {
    if (!this.canPrev()) return;
    this.start.set(Math.max(0, this.start() - this.length()));
    this.loadBlogs();
  }

  //! search
  applySearch(value: string): void {
    this.searchValue.set(value);
    this.start.set(0);
    this.items.set([]); // مهم
    this.loadBlogs(false);
  }

  // !image Blog ??????????
  blogImage(b: IBlog): string {
    return '/imgs/page/homepage2/blog1.png';
  }

  clearSearch(): void {
    this.searchValue.set('');
    this.start.set(0);
    this.loadBlogs();
  }
  // !filter
  setTab(tab: string): void {
    if (this.activeTab() === tab) return;
    this.activeTab.set(tab);
    this.start.set(0);
    this.items.set([]);
    this.loadBlogs(false);
  }

  private tabToFilterValue(tab: string): string | null {
    const map: Record<string, string> = {
      all: '',
      fashion: 'Fashion',
      lifestyle: 'Lifestyle',
      inspiration: 'Inspiration',
      photography: 'Photography',
    };

    return map[tab] ?? '';
  }
}
