import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../core/services/article.service';
import { Article } from 'app/core/interfaces/article.interface';
import { Comment } from 'app/core/interfaces/comment.interface';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article$: Observable<Article>;
  comments$: Observable<Comment[]>;
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.article$ = this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        return this.articleService.getArticleById(id).pipe(
          catchError(error => {
            console.error('Erreur lors du chargement de l\'article', error);
            return of(null);
          })
        );
      })
    );

    this.comments$ = this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        return this.articleService.getCommentsByArticleId(id).pipe(
          tap(comments => this.commentsSubject.next(comments)),
          catchError(error => {
            console.error('Erreur lors du chargement des commentaires', error);
            return of([]);
          })
        );
      })
    );
  }

  submitComment() {
    if (this.newComment.trim()) {
      this.article$.pipe(
        switchMap(article => {
          if (!article) {
            throw new Error('Article non trouvé');
          }
          const comment = {
            articleId: article.id,
            content: this.newComment,
            userId: 0 // à remplacer avec l'id de l'utilisateur actuel
          };
          return this.articleService.addComment(comment);
        }),
        tap(newComment => {
          const currentComments = this.commentsSubject.value;
          this.commentsSubject.next([...currentComments, newComment]);
          this.newComment = '';
        }),
        catchError(error => {
          console.error('Erreur lors de l\'ajout du commentaire', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}