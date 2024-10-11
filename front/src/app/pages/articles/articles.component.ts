import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'app/core/interfaces/article.interface';
import { ArticleService } from 'app/core/services/article.service';
import { BehaviorSubject, catchError, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  currentSortKey: 'createdAt' | 'title' | 'author' = 'createdAt';
  isHandset: boolean = false;
  articles$: Observable<Article[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private articleService: ArticleService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.articles$ = this.articlesSubject.asObservable();
    this.loadArticles();

    this.breakpointObserver.observe(['(max-width: 900px)'])
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.isHandset = result.matches;
    });
  }

  loadArticles(): void {
    this.articleService.getArticles().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des articles', error);
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(articles => {
      this.articlesSubject.next(articles);
      this.sortArticles(this.currentSortKey);
    });
  }

  sortArticles(key: 'createdAt' | 'title' | 'author'): void {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}