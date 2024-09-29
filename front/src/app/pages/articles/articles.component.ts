import { Component, OnInit } from '@angular/core';
import { Article } from 'app/core/interfaces/article.interface';
import { ArticleService } from 'app/core/services/article.service';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  articles$: Observable<Article[]>;
  currentSortKey: 'date' | 'title' | 'author' = 'date';

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articles$ = this.articlesSubject.asObservable();
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des articles', error);
        return of([]);
      })
    ).subscribe(articles => {
      this.articlesSubject.next(articles);
      this.sortArticles(this.currentSortKey);
    });
  }

  sortArticles(key: 'date' | 'title' | 'author') {
    this.currentSortKey = key;
    const sortedArticles = [...this.articlesSubject.value].sort((a, b) => {
      if (key === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return a[key].localeCompare(b[key]);
      }
    });
    this.articlesSubject.next(sortedArticles);
  }
}