import { Component, OnInit } from '@angular/core';
import { Article } from 'app/core/interfaces/article.interface';
import { ArticleService } from 'app/core/services/article.service';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  articles$: Observable<Article[]>;

  constructor (
    private articleService: ArticleService,
  ) {
    this.articles$ = this.articleService.getArticles().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des articles', error);
        return of([]);
      })
    );
  }
}