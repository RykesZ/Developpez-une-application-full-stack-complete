import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../core/services/article.service';
import { TopicService } from '../../core/services/topic.service';
import { Router } from '@angular/router';
import { catchError, lastValueFrom, Observable, of, Subject, takeUntil } from 'rxjs';
import { Topic } from 'app/core/interfaces/topic.interface';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  articleForm: FormGroup;
  topics$: Observable<Topic[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private topicService: TopicService,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      topicId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.topics$ = this.topicService.getAllTopics().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        return of([]);
      }),
      takeUntil(this.destroy$)
    );
  }

  async onSubmit(): Promise<void> {
    if (this.articleForm.valid) {
      try {
        const response = await lastValueFrom(
          this.articleService.createArticle(this.articleForm.value).pipe(
            catchError((error) => {
              console.error('Erreur lors de la création de l\'article', error);
              throw error;  // re-propager l'erreur après l'avoir loguée
            })
          )
        );
        this.router.navigate(['/articles']);
      } catch (error) {
        console.error('Erreur lors de la soumission', error);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();  // Signaler la destruction des abonnements
    this.destroy$.complete();  // Terminer le Subject pour éviter les fuites de mémoire
  }
}