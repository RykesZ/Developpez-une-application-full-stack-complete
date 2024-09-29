import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSuccess } from 'app/core/interfaces/authSuccess.interface';
import { RegisterRequest } from 'app/core/interfaces/registerRequest.interface';
import { User } from 'app/core/interfaces/user.interface';
import { AuthService } from 'app/core/services/auth.service';
import { SessionService } from 'app/core/services/session.service';
import { tap, switchMap, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public onError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerForm.disable();
      const registerRequest = this.registerForm.value as RegisterRequest;
      this.authService.register(registerRequest).pipe(
        tap((response: AuthSuccess) => localStorage.setItem('token', response.token)),
        switchMap(() => this.authService.me()),
        tap((user: User) => {
          this.sessionService.logIn(user);
          this.router.navigate(['/articles']);
        }),
        catchError((error) => {
          this.onError = true;
          return throwError(() => new Error('Registration failed'));
        })
      ).subscribe();
    }
  }
}
