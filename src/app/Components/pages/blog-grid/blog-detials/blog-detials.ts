import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogApiService } from '../../../../Core/Services/Blog/blog-service';
import { IBlog } from '../../../../Core/Models/blog/iblog';
import { decodeId } from '../../../../Core/utlis/Utlis';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-detials',
  imports: [TranslateModule, DatePipe],
  templateUrl: './blog-detials.html',
  styleUrl: './blog-detials.css',
})
export class BlogDetials implements OnInit {
  blog!: IBlog;
  currentUrl = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private BlogApi: BlogApiService,
  ) {}
  ngOnInit(): void {
    let id: number;
    this.currentUrl = window.location.href;

    const eid = this.route.snapshot.paramMap.get('eid');
    const slugFromUrl = this.route.snapshot.paramMap.get('slug') ?? '';

    if (!eid) {
      this.router.navigate(['/blog']);
      return;
    }
    try {
      id = decodeId(eid);
    } catch {
      this.router.navigate(['/blog']);
      return;
    }
    this.BlogApi.getById(id).subscribe({
      next: (blog: IBlog) => {
        const correctSlug = blog.slug ?? '';

        if (correctSlug && slugFromUrl !== correctSlug) {
          this.router.navigate(['/blog', blog.id, correctSlug], { replaceUrl: true });
          return;
        }

        this.blog = blog;
      },
      error: () => this.router.navigate(['/blog']),
    });
  }
  copyLink() {
    navigator.clipboard.writeText(this.currentUrl);
  }
}
