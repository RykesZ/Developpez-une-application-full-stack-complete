import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../core/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  topics: any[] = [];

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.topicService.getTopics().subscribe(
      (topics) => {
        this.topics = topics;
      },
      (error) => {
        console.error('Erreur lors du chargement des thèmes', error);
      }
    );
  }
}