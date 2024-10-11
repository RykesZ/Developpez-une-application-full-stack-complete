import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'app/core/interfaces/article.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() article: Article;

  constructor(private router: Router) {}

  navigateToDetail(): void {
    if (this.article && this.article.id) {
      this.router.navigate(['/article-detail', this.article.id]);
    } else {
      console.error('Article ID is missing');
    }
  }
}