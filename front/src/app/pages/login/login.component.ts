import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSuccess } from 'app/core/interfaces/authSuccess.interface';
import { LoginRequest } from 'app/core/interfaces/loginRequest.interface';
import { User } from 'app/core/interfaces/user.interface';
import { AuthService } from 'app/core/services/auth.service';
import { SessionService } from 'app/core/services/session.service';
import { tap, switchMap, catchError, throwError, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  public onError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const loginRequest = this.loginForm.value as LoginRequest;
  //     this.authService.login(loginRequest).pipe(
  //       tap((response: AuthSuccess) => localStorage.setItem('token', response.token)),
  //       switchMap(() => this.authService.me()),
  //       tap((user: User) => {
  //         this.sessionService.logIn(user);
  //         this.router.navigate(['/articles']);
  //       }),
  //       catchError((error) => {
  //         this.onError = true;
  //         return throwError(() => new Error('Login failed'));
  //       })
  //     ).subscribe();
  //   }
  // }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const loginRequest = this.loginForm.value as LoginRequest;
  
        // Authentification et récupération du token avec firstValueFrom
        const response: AuthSuccess = await firstValueFrom(this.authService.login(loginRequest));
        localStorage.setItem('token', response.token);
  
        // Récupération des informations de l'utilisateur après connexion
        const user: User = await firstValueFrom(this.authService.me());
  
        // Mise à jour de la session et navigation
        this.sessionService.logIn(user);
        await this.router.navigate(['/articles']);
  
      } catch (error) {
        this.onError = true;
        console.error('Login failed', error);
      }
    }
  }
  
}