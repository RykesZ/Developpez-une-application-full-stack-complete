import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../core/services/topic.service';
import { Topic } from 'app/core/interfaces/topic.interface';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  topics$: Observable<Topic[]>;

  constructor(private topicService: TopicService) { 
    this.topics$ = this.topicService.getTopics().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        return of([]);
      })
    );
  }
}