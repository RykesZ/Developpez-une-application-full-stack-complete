import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/core/services/user.service';
import { SubscriptionService } from 'app/core/services/subscription.service';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { Topic } from 'app/core/interfaces/topic.interface';
import { AuthService } from 'app/core/services/auth.service';
import { SessionService } from 'app/core/services/session.service';
import { UpdateUserRequest } from 'app/core/interfaces/updateUserRequest.interface';
import { AuthSuccess } from 'app/core/interfaces/authSuccess.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  public onError = false;
  public onSuccess = false;
  subscriptions$: Observable<Topic[]>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private sessionService: SessionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.subscriptions$ = this.subscriptionService.getUserSubscriptions().pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        return of([]);
      })
    );
  }

  public ngOnInit(): void {
    this.userService.me().subscribe(
      (user: User) => this.profileForm.patchValue({
        username: user.username,
        email: user.email
      })
    )
  }

  async onSave(): Promise<void> {
    if (this.profileForm.valid) {
      try {
        const updateRequest = this.profileForm.value as UpdateUserRequest;

        const response: AuthSuccess = await firstValueFrom(this.userService.updateUser(updateRequest));

        if (response.token) {
          localStorage.setItem('token', response.token);
          this.onSuccess = true;
  
          const user: User = await firstValueFrom(this.userService.me());
  
          this.sessionService.logIn(user, response.token);
          this.sessionService['checkInitialLoginState']();
          this.snackBar.open('Les informations ont été modifiées avec succès !', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      } catch (error) {
        this.onError = true;
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    }
  }

  onLogout(): void {
    this.sessionService.logOut();
    this.router.navigate(['/login']);
  }

  onUnsubscribe(topicId: number): void {
    this.subscriptionService.unsubscribeFromTopic(topicId).subscribe({
      next: () => {
        this.subscriptions$.subscribe(subscriptions => {
          // Filtrer les abonnements pour exclure celui qui a été désabonné
          const filteredSubscriptions = subscriptions.filter(sub => sub.id !== topicId);
          // Réassigner l'observable avec les abonnements filtrés
          this.subscriptions$ = of(filteredSubscriptions);
        });
      },
      error: (error) => console.error('Erreur lors du désabonnement', error)
    });
  }
  
}
