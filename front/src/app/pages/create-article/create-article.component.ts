import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../core/services/article.service';
import { TopicService } from '../../core/services/topic.service';
import { Router } from '@angular/router';
import { catchError, lastValueFrom, Observable, of } from 'rxjs';

interface Topic {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  articleForm: FormGroup;
  topics$: Observable<Topic[]>;

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

    this.topics$ = this.topicService.getTopics().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        return of([]);
      })
    );
  }

  ngOnInit(): void {
    // this.articleForm.valueChanges.subscribe(value => {
    //   console.log('Valeur du formulaire:', value);
    // });
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
        console.log('Article créé avec succès', response);
        this.router.navigate(['/articles']);
      } catch (error) {
        console.error('Erreur lors de la soumission', error);
      }
    }
  }
}