import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../core/services/topic.service';
import { Topic } from 'app/core/interfaces/topic.interface';
import { Observable, catchError, of } from 'rxjs';
import { SubscriptionService } from 'app/core/services/subscription.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  topics$: Observable<Topic[]>;

  constructor(private topicService: TopicService, private subscriptionService: SubscriptionService) { 
    this.topics$ = this.topicService.getTopics().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        return of([]);
      })
    );
  }

  onSubscribe(topicId: number): void {
    this.subscriptionService.subscribeToTopic(topicId).subscribe({
      next: () => console.log(`Abonnement réussi au thème ${topicId}`),
      error: (error) => console.error('Erreur lors de l\'abonnement au thème', error)
    });
  }
}