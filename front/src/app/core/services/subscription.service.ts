import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'api/topics';

  constructor(private http: HttpClient) {}

  // Récupère la liste des abonnements de l'utilisateur
  getUserSubscriptions(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/subscribed`).pipe(
      catchError((error) => {
        console.error('Erreur lors du chargement des abonnements', error);
        return of([]);  // Renvoie un tableau vide en cas d'erreur
      })
    );
  }

  // S'abonne à un nouveau thème
  subscribeToTopic(topicId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscribe/${topicId}`, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return of(null);  // Renvoie une valeur null en cas d'erreur
      })
    );
  }

  // Se désabonne d'un thème
  unsubscribeFromTopic(topicId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/unsubscribe/${topicId}`, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return of(null);  // Renvoie une valeur null en cas d'erreur
      })
    );
  }
}
