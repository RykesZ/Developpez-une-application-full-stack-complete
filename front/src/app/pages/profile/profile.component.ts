import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/core/services/user.service';
import { SubscriptionService } from 'app/core/services/subscription.service';
import { catchError, Observable, of } from 'rxjs';

interface Subscription {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  subscriptions$: Observable<Subscription[]>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.subscriptions$ = this.subscriptionService.getUserSubscriptions(1).pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        return of([]);
      })
    );
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const user = this.userService.getUser(0); // Récupérer l'utilisateur (simulé)
    if (user) {
      this.profileForm.patchValue({
        username: user.username,
        email: user.email
      });
    }
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.profileForm.value).subscribe({
        next: () => console.log('Profil mis à jour avec succès'),
        error: (error) => console.error('Erreur lors de la mise à jour du profil', error)
      });
    }
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onUnsubscribe(topicId: number): void {
    this.subscriptionService.unsubscribeFromTopic(topicId).subscribe({
      next: () => {
        console.log('Désabonnement réussi');
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
