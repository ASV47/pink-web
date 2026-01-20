import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IShopliftItem } from '../../../../Core/Models/Shoplift/ishoplift-item';
import { IDataTableRequest } from '../../../../Core/Models/Shoplift/IDataTableRequest';
import { ShopliftService } from '../../../../Core/Services/shop/ShopliftService';
import { IDataTableResponse } from '../../../../Core/Models/Shoplift/IData-table-response';
import { Subscription } from 'rxjs';
import { Language } from '../../../../Core/Services/language/language';
import { ICategoryTreeNode } from '../../../../Core/Models/TreeCategory/icategory-tree-node';
import { CategoryTreeService } from '../../../../Core/Services/shop/CategoryService/CategoryTreeService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-left-filter',
  imports: [TranslateModule, CommonModule, RouterLink],
  templateUrl: './shop-left-filter.html',
  styleUrl: './shop-left-filter.css',
})
export class ShopLeftFilter implements OnInit, OnDestroy {
  //! Defination
  items: IShopliftItem[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  private apiSub?: Subscription;
  private categorySub?: Subscription;
  private subscription = new Subscription();

  categories: ICategoryTreeNode[] = [];
  selectedCategoryIds: number[] = [];
  expandedCategoryIds = new Set<number>();

  // ! initialization
  IdataTableRequestItems: IDataTableRequest = {
    draw: 1,
    start: 0,
    length: 10,
    sortColumnName: 'Name',
    sortColumnDirection: 'asc',
    searchValue: '',
    searchableCloumnsValues: {},
    searchableCloumns: ['Name'],
  };
  categoryReq: IDataTableRequest = {
    draw: 1,
    start: 0,
    length: 1000,
    sortColumnName: 'Name',
    sortColumnDirection: 'asc',
    searchValue: '',
    searchableCloumnsValues: {},
    searchableCloumns: ['Name'],
  };

  constructor(
    private shopLifter: ShopliftService,
    private categoryTreeService: CategoryTreeService,
    private language: Language,
  ) {}
  //! Life Cycle
  ngOnInit(): void {
    this.loadItem();
    this.loadCategories();
    const langSub = this.language.lang$.subscribe(() => {
      this.loadItem();
      this.loadCategories();
    });

    this.subscription.add(langSub);
  }

  // !loading Data ...
  loadItem() {
    this.loading = true;
    this.apiSub?.unsubscribe();

    this.apiSub = this.shopLifter
      .getDataTablePagenationFromBody(this.IdataTableRequestItems)
      .subscribe({
        next: (res) => {
          this.items = res.data;
          this.totalRecords = res.recordsFiltered ?? res.recordsTotal;
          this.loading = false;
        },
        error: (err) => {
          console.error('خطأ في تحميل البيانات', err);
          this.loading = false;
        },
      });

    this.subscription.add(this.apiSub);
  }

  loadCategories() {
    this.categorySub?.unsubscribe();

    this.categorySub = this.categoryTreeService
      .getCategoriesTree(this.categoryReq)
      .subscribe((res) => {
        this.categories = res.object ?? [];
        console.log('Category is:', this.categories);
        console.log('categories first:', this.categories[0]);
        console.log('first childs length:', this.categories[0]?.childs?.length);
      });

    this.subscription.add(this.categorySub);
  }
  // ! Category And Toggle
  onToggleCategory(id: number, checked: boolean) {
    const node = this.findNodeById(id, this.categories);
    const descendants = node ? this.collectDescendantIds(node) : [];
    const idsToApply = [id, ...descendants];

    if (checked) {
      for (const x of idsToApply) {
        if (!this.selectedCategoryIds.includes(x)) this.selectedCategoryIds.push(x);
      }
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter((x) => !idsToApply.includes(x));
    }

    this.IdataTableRequestItems.start = 0;

    if (this.selectedCategoryIds.length === 0) {
      this.IdataTableRequestItems.searchableCloumnsValues = {};
      this.IdataTableRequestItems.searchableCloumns = ['Name'];
    } else {
      this.IdataTableRequestItems.searchableCloumnsValues = {
        categoryId: this.selectedCategoryIds.join(','),
      };
      this.IdataTableRequestItems.searchableCloumns = ['categoryId'];
    }

    this.loadItem();
  }

  toggleExpand(id: number) {
    if (this.expandedCategoryIds.has(id)) {
      this.expandedCategoryIds.delete(id);
    } else {
      this.expandedCategoryIds.add(id);
    }
  }

  isExpanded(id: number) {
    return this.expandedCategoryIds.has(id);
  }

  // ! Search
  onSearch(value: string): void {
    this.IdataTableRequestItems.searchValue = value;
    this.IdataTableRequestItems.start = 0;
    this.loadItem();
  }
  // ! Sort asc or desc
  onSort(column: string, direction: 'asc' | 'desc'): void {
    this.IdataTableRequestItems.sortColumnName = column;
    this.IdataTableRequestItems.sortColumnDirection = direction;
    this.IdataTableRequestItems.start = 0;
    this.loadItem();
  }
  clearCategory() {
    this.selectedCategoryIds = [];
    this.IdataTableRequestItems.searchableCloumnsValues = {};
    this.IdataTableRequestItems.searchableCloumns = ['Name'];
    this.IdataTableRequestItems.start = 0;
    this.loadItem();
  }
  // ! Paggination
  get pageSize() {
    return this.IdataTableRequestItems.length || 10;
  }
  get currentPage() {
    return Math.floor(this.IdataTableRequestItems.start / this.pageSize) + 1;
  }
  get totalPages() {
    return Math.max(1, Math.ceil((this.totalRecords || 0) / this.pageSize));
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    if (page === this.currentPage) return;

    this.IdataTableRequestItems.start = (page - 1) * this.pageSize;
    this.loadItem();
    this.scrollToProductsTop();
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
  get pages(): number[] {
    const total = this.totalPages;
    const cur = this.currentPage;
    const windowSize = 5;

    let start = Math.max(1, cur - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    const arr: number[] = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  }

  get canPrev() {
    return this.currentPage > 1;
  }
  get canNext() {
    return this.currentPage < this.totalPages;
  }

  // ! scrolling to Up {Helper}
  private scrollToProductsTop() {
    document.getElementById('productsTop')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  // ! Pagination Helper
  private collectDescendantIds(node: ICategoryTreeNode): number[] {
    const ids: number[] = [];
    const stack = [...(node.childs ?? [])];

    while (stack.length) {
      const cur = stack.pop()!;
      ids.push(cur.id);
      if (cur.childs?.length) stack.push(...cur.childs);
    }

    return ids;
  }

  private findNodeById(id: number, nodes: ICategoryTreeNode[]): ICategoryTreeNode | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.childs?.length) {
        const found = this.findNodeById(id, n.childs);
        if (found) return found;
      }
    }
    return null;
  }

  // ! Cleaning Subscriptin
  ngOnDestroy(): void {
    this.apiSub?.unsubscribe();
    this.categorySub?.unsubscribe();
    this.subscription.unsubscribe();
  }

  // ! Fliter

  isFilterOpen = false;

  openFilter() {
    this.isFilterOpen = true;
    document.body.classList.add('no-scroll');
  }

  closeFilter() {
    this.isFilterOpen = false;
    document.body.classList.remove('no-scroll');
  }

  toggleFilter() {
    this.isFilterOpen ? this.closeFilter() : this.openFilter();
  }
}
