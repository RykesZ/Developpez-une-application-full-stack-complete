import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://api.exemple.com/user';  // URL fictive pour l'API utilisateur

    constructor(private http: HttpClient) { }

    // Récupère les informations de l'utilisateur (simulé ici)
    public getUser(id: number): User {
        // Simuler un utilisateur pour l'exemple
        return {
            id: 0,
            username: 'JohnDoe',
            email: 'johndoe@example.com'
        };
    }

    public me(): Observable<User> {
        // return this.http.get<User>(`${this.apiUrl}/me`);
        return of({
            id: 0,
            username: 'JohnDoe',
            email: 'johndoe@example.com'
        });
      }

    // Met à jour les informations de l'utilisateur
    public updateUser(user: User): Observable<any> {
        return this.http.put(`${this.apiUrl}/update`, user).pipe(
            map((response: any) => {
                console.log('Profil mis à jour avec succès');
                return response;
            }),
            catchError((error) => {
                console.error('Erreur lors de la mise à jour du profil', error);
                return of(null);  // Renvoie une valeur null en cas d'erreur
            })
        );
    }

    // Déconnecte l'utilisateur
    public logout(): void {
        console.log('Déconnexion en cours...');
        // Implémenter la logique de déconnexion réelle ici (par exemple, supprimer le token de session)
        // Redirection ou suppression du token
        localStorage.removeItem('authToken');  // Par exemple, suppression d'un token d'authentification
    }
}
