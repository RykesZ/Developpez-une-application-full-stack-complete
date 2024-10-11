import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopicService } from '../../core/services/topic.service';
import { Topic } from 'app/core/interfaces/topic.interface';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { SubscriptionService } from 'app/core/services/subscription.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit, OnDestroy {
  isHandset: boolean = false;
  topics$: Observable<Topic[]>;
  subscriptions$: Observable<Topic[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private topicService: TopicService, 
    private subscriptionService: SubscriptionService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getTopics();
    this.getSubscriptions();
    this.breakpointObserver.observe(['(max-width: 900px)'])
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.isHandset = result.matches;
    });
  }

  getTopics(): void {
    this.topics$ = this.topicService.getNotSubscribedTopics().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        return of([]);
      }),
      takeUntil(this.destroy$)
    );
  }
  
  getSubscriptions(): void {
    this.subscriptions$ = this.subscriptionService.getUserSubscriptions().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        return of([]);
      }),
      takeUntil(this.destroy$)
    );
  }

  onSubscribe(topicId: number): void {
    this.subscriptionService.subscribeToTopic(topicId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.getTopics();
        this.getSubscriptions();
      },
      error: (error) => console.error('Erreur lors de l\'abonnement au thème', error)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}