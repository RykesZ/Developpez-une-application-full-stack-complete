import { BreakpointObserver } from '@angular/cdk/layout';
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
  currentSortKey: 'createdAt' | 'title' | 'author' = 'createdAt';
  isHandset: boolean = false;

  constructor(
    private articleService: ArticleService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.articles$ = this.articlesSubject.asObservable();
    this.loadArticles();

    this.breakpointObserver.observe(['(max-width: 900px)']).subscribe(result => {
      this.isHandset = result.matches;
    });
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

  sortArticles(key: 'createdAt' | 'title' | 'author') {
    this.currentSortKey = key;
    const sortedArticles = [...this.articlesSubject.value].sort((a, b) => {
      if (key === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return a[key].localeCompare(b[key]);
      }
    });
    this.articlesSubject.next(sortedArticles);
  }
}