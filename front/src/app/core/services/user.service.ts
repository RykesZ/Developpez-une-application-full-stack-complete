import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private pathService = 'api/auth';

    constructor(private http: HttpClient) { }

    // Met à jour les informations de l'utilisateur
    public updateUser(user: User): Observable<any> {
        return this.http.put(`${this.pathService}/update`, user).pipe(
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
}
