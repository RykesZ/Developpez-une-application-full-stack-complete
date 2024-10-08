import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UpdateUserRequest } from '../interfaces/updateUserRequest.interface';
import { AuthSuccess } from '../interfaces/authSuccess.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private pathService = 'api/user';

    constructor(private http: HttpClient) { }

    public me(): Observable<User> {
        return this.http.get<User>(`${this.pathService}/me`);
      }

    // Met à jour les informations de l'utilisateur
    public updateUser(user: UpdateUserRequest): Observable<AuthSuccess> {
        return this.http.put(`${this.pathService}/update`, user).pipe(
            map((response: any) => {
                return response as AuthSuccess;
            }),
            catchError((error) => {
                console.error('Erreur lors de la mise à jour du profil', error);
                throw new Error('Mise à jour du profil échouée');
            })
        );
    }
}
