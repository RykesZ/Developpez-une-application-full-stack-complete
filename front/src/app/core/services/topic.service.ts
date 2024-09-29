import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {


  topics = [
    { id: 1, title: 'Angular', description: 'Framework JavaScript pour création d\'applications web' },
    { id: 2, title: 'React', description: 'Bibliothèque JavaScript pour interfaces utilisateur' },
    { id: 3, title: 'Vue.js', description: 'Framework progressif pour construire des interfaces utilisateur' },
    { id: 4, title: 'Node.js', description: 'Environnement d\'exécution JavaScript côté serveur' },
    { id: 5, title: 'Python', description: 'Langage de programmation polyvalent et puissant' },
    { id: 6, title: 'Machine Learning', description: 'Sous-domaine de l\'intelligence artificielle' },
  ];

  private apiUrl = 'api/topics';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
    // return of(this.topics);
  }

}