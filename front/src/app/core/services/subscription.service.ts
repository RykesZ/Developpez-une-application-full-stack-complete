import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Subscription {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'api/topics';
  private subscriptions = [
    { id: 1, title: 'Titre du thème', description: 'Description: lorem ipsum is simply dummy text...' },
    { id: 2, title: 'Titre du thème', description: 'Description: lorem ipsum is simply dummy text...' }
  ];

  constructor(private http: HttpClient) {}

  // Récupère la liste des abonnements de l'utilisateur
  getUserSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}/subscribed`).pipe(
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
        console.log('Abonnement réussi au thème', topicId);
        return response;
      }),
      catchError((error) => {
        console.error('Erreur lors de l\'abonnement au thème', error);
        return of(null);  // Renvoie une valeur null en cas d'erreur
      })
    );
  }

  // Se désabonne d'un thème
  unsubscribeFromTopic(topicId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/unsubscribe/${topicId}`, {}).pipe(
      map((response: any) => {
        console.log('Désabonnement réussi du thème', topicId);
        return response;
      }),
      catchError((error) => {
        console.error('Erreur lors du désabonnement du thème', error);
        return of(null);  // Renvoie une valeur null en cas d'erreur
      })
    );
  }
}
